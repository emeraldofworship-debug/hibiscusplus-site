"""Phase 3 — HibiscusPlus shop / Stripe / branding / orders backend tests."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://tea-wellness-guide.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "emeraldofworship@hibiscusplus.co.uk"
ADMIN_PASSWORD = "Hibiscus2025!"
DEFAULT_LOGO = "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/eei6kk0o_HibiscuPlus_20260227_093727_0000%20%283%29%20%281%29.png"


@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{BASE_URL}/api/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return r.json()["access_token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


# ---------- Branding ----------

class TestBranding:
    def test_public_get_branding(self):
        r = requests.get(f"{BASE_URL}/api/settings/branding")
        assert r.status_code == 200
        data = r.json()
        assert "logo_url" in data
        assert isinstance(data["logo_url"], str)
        assert data["logo_url"].startswith(("http://", "https://"))

    def test_admin_put_requires_auth(self):
        r = requests.put(f"{BASE_URL}/api/admin/settings/branding", json={"logo_url": "https://example.com/x.png"})
        assert r.status_code == 401

    def test_admin_put_rejects_non_http(self, auth_headers):
        r = requests.put(f"{BASE_URL}/api/admin/settings/branding", json={"logo_url": "ftp://bad/x.png"}, headers=auth_headers)
        assert r.status_code == 400

    def test_admin_put_rejects_empty(self, auth_headers):
        r = requests.put(f"{BASE_URL}/api/admin/settings/branding", json={"logo_url": ""}, headers=auth_headers)
        assert r.status_code == 400

    def test_admin_put_updates_and_public_get_reflects(self, auth_headers):
        new_logo = "https://example.com/test-logo.png"
        r = requests.put(f"{BASE_URL}/api/admin/settings/branding", json={"logo_url": new_logo}, headers=auth_headers)
        assert r.status_code == 200
        assert r.json()["logo_url"] == new_logo

        # Public GET reflects update
        g = requests.get(f"{BASE_URL}/api/settings/branding")
        assert g.json()["logo_url"] == new_logo

        # Reset to default
        rr = requests.put(f"{BASE_URL}/api/admin/settings/branding", json={"logo_url": DEFAULT_LOGO}, headers=auth_headers)
        assert rr.status_code == 200
        gg = requests.get(f"{BASE_URL}/api/settings/branding")
        assert gg.json()["logo_url"] == DEFAULT_LOGO


# ---------- Snacks seeding ----------

class TestSnacksCatalog:
    def test_at_least_six_snack_or_event_products(self):
        r = requests.get(f"{BASE_URL}/api/products")
        assert r.status_code == 200
        items = r.json()["data"]
        snacks_or_events = [p for p in items if p.get("category") in ("snack", "event")]
        assert len(snacks_or_events) >= 6, f"expected >=6 snack/event, got {len(snacks_or_events)}: {[p.get('id') for p in snacks_or_events]}"

    def test_expected_seeded_ids_present(self):
        r = requests.get(f"{BASE_URL}/api/products")
        ids = {p.get("id") for p in r.json()["data"]}
        expected = {"snack-puff-puff", "snack-akara", "snack-samosa", "snack-spring-rolls", "snack-platter", "event-breakfast-tasting"}
        missing = expected - ids
        assert not missing, f"missing snack ids: {missing}"


# ---------- Checkout: negative paths ----------

class TestCheckoutNegative:
    def test_no_items(self):
        r = requests.post(f"{BASE_URL}/api/checkout/session", json={"items": [], "origin_url": "https://x.com"})
        assert r.status_code == 400

    def test_missing_items_key(self):
        r = requests.post(f"{BASE_URL}/api/checkout/session", json={"origin_url": "https://x.com"})
        assert r.status_code == 400

    def test_missing_origin_url(self):
        r = requests.post(f"{BASE_URL}/api/checkout/session", json={"items": [{"product_id": "snack-puff-puff", "quantity": 1}]})
        assert r.status_code == 400

    def test_invalid_product_id(self):
        r = requests.post(f"{BASE_URL}/api/checkout/session", json={
            "items": [{"product_id": "does-not-exist-xyz", "quantity": 1}],
            "origin_url": "https://x.com",
        })
        assert r.status_code == 400
        assert "not found" in r.json().get("detail", "").lower()

    def test_coming_soon_product_blocked(self, auth_headers):
        # Create a comingSoon product, attempt checkout, then clean up
        pid = f"TEST_coming_soon_{uuid.uuid4().hex[:8]}"
        cr = requests.post(f"{BASE_URL}/api/admin/products", json={
            "id": pid, "name": "TEST_ComingSoon", "price": "£5.00", "comingSoon": True, "category": "snack", "in_stock": False,
        }, headers=auth_headers)
        assert cr.status_code == 200, cr.text
        try:
            r = requests.post(f"{BASE_URL}/api/checkout/session", json={
                "items": [{"product_id": pid, "quantity": 1}],
                "origin_url": "https://x.com",
            })
            assert r.status_code == 400
            assert "not yet purchasable" in r.json().get("detail", "").lower()
        finally:
            requests.delete(f"{BASE_URL}/api/admin/products/{pid}", headers=auth_headers)


# ---------- Checkout: happy path + idempotent status ----------

class TestCheckoutHappyPath:
    session_id = None

    def test_create_session_returns_url_and_persists(self):
        payload = {
            "items": [
                {"product_id": "snack-puff-puff", "quantity": 2},
                {"product_id": "snack-akara", "quantity": 1},
            ],
            "origin_url": BASE_URL,
        }
        r = requests.post(f"{BASE_URL}/api/checkout/session", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "url" in data and data["url"].startswith("https://checkout.stripe.com")
        assert "session_id" in data and len(data["session_id"]) > 0
        assert data["currency"] == "gbp"
        assert isinstance(data["amount"], (int, float)) and data["amount"] > 0
        TestCheckoutHappyPath.session_id = data["session_id"]

    def test_status_returns_persisted_txn(self):
        sid = TestCheckoutHappyPath.session_id
        assert sid, "previous test did not run"
        r = requests.get(f"{BASE_URL}/api/checkout/status/{sid}")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["session_id"] == sid
        # Initiated session: payment_status is one of unpaid/no_payment_required/initiated
        assert "payment_status" in data
        assert "items" in data and len(data["items"]) == 2

    def test_status_unknown_session(self):
        r = requests.get(f"{BASE_URL}/api/checkout/status/cs_does_not_exist_xyz")
        assert r.status_code == 404


# ---------- Admin Orders ----------

class TestAdminOrders:
    def test_orders_requires_auth(self):
        r = requests.get(f"{BASE_URL}/api/admin/orders")
        assert r.status_code == 401

    def test_orders_returns_list(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/admin/orders", headers=auth_headers)
        assert r.status_code == 200
        data = r.json()
        assert data["success"] is True
        assert isinstance(data["data"], list)
        # At least the session created above should be present
        assert data["count"] >= 1
        # Newest first → first item has a created_at >= last item
        if len(data["data"]) >= 2:
            assert data["data"][0]["created_at"] >= data["data"][-1]["created_at"]
        # No mongo _id leaks
        for txn in data["data"][:5]:
            assert "_id" not in txn
            assert "session_id" in txn
            assert txn.get("currency") == "gbp"


# ---------- Public regression ----------

class TestPublicRegression:
    def test_recipes(self):
        r = requests.get(f"{BASE_URL}/api/recipes")
        assert r.status_code == 200 and r.json()["success"] is True

    def test_products(self):
        r = requests.get(f"{BASE_URL}/api/products")
        assert r.status_code == 200

    def test_blog(self):
        r = requests.get(f"{BASE_URL}/api/blog")
        assert r.status_code == 200

    def test_feedback_post(self):
        r = requests.post(f"{BASE_URL}/api/feedback", json={"name": "TEST_phase3", "message": "regression"})
        assert r.status_code == 200

    def test_newsletter_subscribe(self):
        email = f"test_phase3_{uuid.uuid4().hex[:8]}@example.com"
        r = requests.post(f"{BASE_URL}/api/newsletter/subscribe", json={"email": email})
        assert r.status_code == 200
