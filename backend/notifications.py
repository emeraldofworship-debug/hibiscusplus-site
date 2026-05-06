"""Pluggable notification helpers.

By default, every notification is persisted into the MongoDB `notifications`
collection so you can see it in the admin panel.  If RESEND_API_KEY is set
in the environment, transactional emails are also sent via Resend.

Email is best-effort: failures are logged and swallowed so they never block
critical paths like Stripe webhooks or feedback submissions.
"""
from __future__ import annotations

import os
import asyncio
import logging
import uuid
from datetime import datetime, timezone
from typing import Optional

logger = logging.getLogger(__name__)

ADMIN_EMAIL_FALLBACK = "emeraldofworship@hibiscusplus.co.uk"


def _resend_enabled() -> bool:
    return bool(os.environ.get("RESEND_API_KEY"))


def _sender_email() -> str:
    # `onboarding@resend.dev` works without DNS verification — perfect for v1.
    # User can switch to `noreply@hibiscusplus.co.uk` after verifying the domain in Resend.
    return os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")


async def _send_via_resend(to: str, subject: str, html: str, text: Optional[str] = None) -> Optional[str]:
    """Returns the Resend email id on success, None on failure."""
    if not _resend_enabled():
        return None
    try:
        import resend
        resend.api_key = os.environ["RESEND_API_KEY"]
        params = {
            "from": _sender_email(),
            "to": [to],
            "subject": subject,
            "html": html,
        }
        if text:
            params["text"] = text
        email = await asyncio.to_thread(resend.Emails.send, params)
        return email.get("id") if isinstance(email, dict) else None
    except Exception as e:
        logger.warning(f"Resend send failed (notification still logged): {e}")
        return None


async def notify(db, *, kind: str, title: str, body: str, html: Optional[str] = None,
                 to_email: Optional[str] = None, also_email_admin: bool = True,
                 metadata: Optional[dict] = None) -> dict:
    """Persist a notification to MongoDB and (best-effort) email it via Resend.

    Args:
        db: motor database instance
        kind: short identifier e.g. "order.paid", "feedback.new", "newsletter.subscribed"
        title: short headline used for both DB record + email subject
        body: plain text body for DB / fallback email text
        html: optional HTML body for the email
        to_email: customer or recipient email; if None, only admin is notified
        also_email_admin: whether to CC the admin email
        metadata: arbitrary dict stored alongside the notification
    """
    record = {
        "id": str(uuid.uuid4()),
        "kind": kind,
        "title": title,
        "body": body,
        "to_email": to_email,
        "metadata": metadata or {},
        "created_at": datetime.now(timezone.utc).isoformat(),
        "channels": [],
    }

    html_body = html or f"<p>{body}</p>"
    admin_email = os.environ.get("ADMIN_EMAIL", ADMIN_EMAIL_FALLBACK)

    if to_email:
        sent = await _send_via_resend(to_email, title, html_body, text=body)
        record["channels"].append({"to": to_email, "resend_id": sent, "ok": bool(sent)})

    if also_email_admin and admin_email and admin_email != to_email:
        sent = await _send_via_resend(admin_email, f"[HibiscusPlus] {title}", html_body, text=body)
        record["channels"].append({"to": admin_email, "resend_id": sent, "ok": bool(sent)})

    try:
        await db.notifications.insert_one(record.copy())
    except Exception as e:
        logger.error(f"Failed to persist notification: {e}")

    return record


# ---------- HTML templates ----------

_BRAND = """
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#2A1418; background:#FAF5EE; padding:24px; }
  .card { background:#FFFBF5; border:1px solid rgba(107,29,58,0.14); padding:32px; max-width:560px; margin:0 auto; }
  h1 { font-family: 'Cormorant Garamond', Georgia, serif; font-weight:300; font-size:28px; color:#6B1D3A; margin:0 0 8px; }
  .label { font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#A67C3E; margin-bottom:6px; }
  table.items { width:100%; border-collapse:collapse; margin:16px 0; }
  table.items td { padding:8px 0; border-bottom:1px solid rgba(107,29,58,0.07); font-size:14px; }
  .total { font-size:18px; color:#6B1D3A; padding-top:12px; }
  .footer { font-size:11px; color:#7A6257; text-align:center; margin-top:24px; }
</style>
"""


def order_paid_html(order: dict, customer_name: str = "") -> str:
    items = order.get("items", [])
    rows = "".join(
        f"<tr><td>{i['qty']}× {i['name']}</td><td style='text-align:right'>£{(i['qty']*i['unit_price']):.2f}</td></tr>"
        for i in items
    )
    delivery = order.get("delivery", {})
    delivery_block = ""
    if delivery.get("method") == "ship":
        addr = delivery.get("address", {})
        delivery_block = (
            "<p class='label'>Shipping to</p>"
            f"<p>{addr.get('name','')}<br>{addr.get('line1','')}<br>"
            f"{(addr.get('line2','')+'<br>') if addr.get('line2') else ''}"
            f"{addr.get('city','')}, {addr.get('postcode','')}<br>"
            "United Kingdom</p>"
        )
    elif delivery.get("method") == "pickup":
        delivery_block = "<p class='label'>Collection</p><p>Pickup at next weekend market — we'll email you the date and stall location.</p>"

    return _BRAND + f"""
    <div class='card'>
      <p class='label'>Order Confirmed</p>
      <h1>Thank you{', ' + customer_name if customer_name else ''}.</h1>
      <p>Your HibiscusPlus order is in. We'll be in touch shortly with collection or shipping details.</p>
      <table class='items'>{rows}</table>
      <div class='total'>Total paid: £{order.get('amount',0):.2f}</div>
      {delivery_block}
      <p class='footer'>HIBISCUSPLUS LIMITED · Manchester · @hibiscusplus_ltd</p>
    </div>
    """


def feedback_html(f: dict) -> str:
    return _BRAND + f"""
    <div class='card'>
      <p class='label'>New Tasting Feedback</p>
      <h1>{f.get('name','Anonymous')} just shared their thoughts</h1>
      <p><strong>Blend:</strong> {f.get('blend','—')}</p>
      <p><strong>Rating:</strong> {f.get('rating','—')}/5</p>
      <p><strong>Would buy:</strong> {f.get('wouldBuy','—')}</p>
      {('<p><strong>Taste:</strong> ' + f.get('taste','') + '</p>') if f.get('taste') else ''}
      {('<p><strong>Comments:</strong> ' + f.get('comments','') + '</p>') if f.get('comments') else ''}
    </div>
    """


def newsletter_html(email: str, interest: str = "") -> str:
    return _BRAND + f"""
    <div class='card'>
      <p class='label'>New Subscriber</p>
      <h1>{email}</h1>
      {f'<p>Interest: <strong>{interest}</strong></p>' if interest else ''}
    </div>
    """
