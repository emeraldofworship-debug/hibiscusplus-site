"""
HibiscusPlus Limited — A4 Letterhead Generator
Creates a professional letterhead PDF with blended gradient borders
using colours extracted from Logo 1.
"""

import os
import requests
from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import Color, HexColor, white, black
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from PIL import Image

# A4 dimensions
PAGE_W, PAGE_H = A4  # 595.27 x 841.89 points

# Brand colours from Logo 1
ROSE_DEEP = HexColor("#C41E3A")      # Deep crimson/rose from "Hibiscus" text
ROSE_MID = HexColor("#DC143C")       # Primary rose/magenta
ROSE_LIGHT = HexColor("#F4A6B8")     # Soft rose
CREAM = HexColor("#F7F0E3")          # Warm cream from logo background
CREAM_LIGHT = HexColor("#FBF7F0")    # Lighter cream
GOLD_WARM = HexColor("#C9A96E")      # Warm gold accent
GREEN_LEAF = HexColor("#5A8F3C")     # Green from fruit wreath
BURGUNDY = HexColor("#6B1D3A")       # Deep burgundy accent
CHARCOAL = HexColor("#2D2D2D")       # Dark text
GREY_TEXT = HexColor("#5A5A5A")      # Secondary text
GREY_LIGHT = HexColor("#9B9B9B")     # Tertiary text

LOGO_URL = "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/5ggfxigz_HibiscuPlus%20Limited%20Dynamic%20Letterform%20Integration%20%281%29.png"


def download_logo():
    """Download logo image and return as ImageReader."""
    response = requests.get(LOGO_URL)
    img = Image.open(BytesIO(response.content))
    # Convert to RGB if RGBA
    if img.mode == 'RGBA':
        bg = Image.new('RGB', img.size, (247, 240, 227))
        bg.paste(img, mask=img.split()[3])
        img = bg
    buf = BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return ImageReader(buf)


def draw_gradient_rect(c, x, y, w, h, color_start, color_end, steps=160, direction='vertical'):
    """Draw a smooth gradient rectangle."""
    for i in range(steps):
        t = i / float(steps)
        r = color_start.red + (color_end.red - color_start.red) * t
        g = color_start.green + (color_end.green - color_start.green) * t
        b = color_start.blue + (color_end.blue - color_start.blue) * t
        c.setFillColor(Color(r, g, b))
        if direction == 'vertical':
            strip_h = h / steps
            c.rect(x, y + h - (i + 1) * strip_h, w, strip_h + 0.5, stroke=0, fill=1)
        elif direction == 'horizontal':
            strip_w = w / steps
            c.rect(x + i * strip_w, y, strip_w + 0.5, h, stroke=0, fill=1)


def draw_gradient_rect_alpha(c, x, y, w, h, color, alpha_start, alpha_end, steps=120, direction='vertical'):
    """Draw a gradient that fades from one alpha to another, blending with cream."""
    for i in range(steps):
        t = i / float(steps)
        alpha = alpha_start + (alpha_end - alpha_start) * t
        # Blend colour with cream background
        r = color.red * alpha + CREAM_LIGHT.red * (1 - alpha)
        g = color.green * alpha + CREAM_LIGHT.green * (1 - alpha)
        b = color.blue * alpha + CREAM_LIGHT.blue * (1 - alpha)
        c.setFillColor(Color(r, g, b))
        if direction == 'vertical':
            strip_h = h / steps
            c.rect(x, y + h - (i + 1) * strip_h, w, strip_h + 0.5, stroke=0, fill=1)
        elif direction == 'horizontal_ltr':
            strip_w = w / steps
            c.rect(x + i * strip_w, y, strip_w + 0.5, h, stroke=0, fill=1)
        elif direction == 'horizontal_rtl':
            strip_w = w / steps
            c.rect(x + w - (i + 1) * strip_w, y, strip_w + 0.5, h, stroke=0, fill=1)


def create_letterhead(output_path):
    c = canvas.Canvas(output_path, pagesize=A4)
    c.setTitle("HibiscusPlus Limited — Letterhead")
    c.setAuthor("HibiscusPlus Limited")

    # === BACKGROUND: Warm cream fill ===
    c.setFillColor(CREAM_LIGHT)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    # === TOP BORDER: Rose gradient that fades into the page ===
    top_band_h = 18 * mm
    # Solid rose-to-burgundy band at very top
    draw_gradient_rect(c, 0, PAGE_H - 6 * mm, PAGE_W, 6 * mm, ROSE_DEEP, BURGUNDY, steps=50, direction='horizontal')
    # Fading rose gradient below the solid band
    draw_gradient_rect_alpha(c, 0, PAGE_H - top_band_h, PAGE_W, top_band_h - 6 * mm, ROSE_LIGHT, 0.45, 0.0, steps=60, direction='vertical')

    # === THIN GOLD ACCENT LINE below top band ===
    c.setStrokeColor(GOLD_WARM)
    c.setLineWidth(0.6)
    gold_y = PAGE_H - 6.5 * mm
    c.line(20 * mm, gold_y, PAGE_W - 20 * mm, gold_y)

    # === LEFT BORDER: Subtle vertical fade ===
    left_band_w = 12 * mm
    draw_gradient_rect_alpha(c, 0, 30 * mm, left_band_w, PAGE_H - 55 * mm, ROSE_LIGHT, 0.2, 0.0, steps=40, direction='horizontal_ltr')

    # === RIGHT BORDER: Subtle vertical fade ===
    right_band_w = 12 * mm
    draw_gradient_rect_alpha(c, PAGE_W - right_band_w, 30 * mm, right_band_w, PAGE_H - 55 * mm, ROSE_LIGHT, 0.2, 0.0, steps=40, direction='horizontal_rtl')

    # === BOTTOM BORDER: Gradient that fades upward ===
    bottom_band_h = 28 * mm
    # Fading rose gradient
    draw_gradient_rect_alpha(c, 0, 0, PAGE_W, bottom_band_h - 4 * mm, ROSE_LIGHT, 0.0, 0.35, steps=60, direction='vertical')
    # Solid band at very bottom
    draw_gradient_rect(c, 0, 0, PAGE_W, 4 * mm, BURGUNDY, ROSE_DEEP, steps=50, direction='horizontal')

    # === THIN GOLD LINE above bottom band ===
    c.setStrokeColor(GOLD_WARM)
    c.setLineWidth(0.6)
    c.line(20 * mm, 4.5 * mm, PAGE_W - 20 * mm, 4.5 * mm)

    # === LOGO ===
    logo = download_logo()
    logo_w = 52 * mm
    logo_h = 52 * mm
    logo_x = (PAGE_W - logo_w) / 2
    logo_y = PAGE_H - 14 * mm - logo_h
    c.drawImage(logo, logo_x, logo_y, width=logo_w, height=logo_h, preserveAspectRatio=True, mask='auto')

    # === COMPANY NAME ===
    name_y = logo_y - 4 * mm
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(ROSE_DEEP)
    c.drawCentredString(PAGE_W / 2, name_y, "HIBISCUSPLUS LIMITED")

    # === TAGLINE ===
    tagline_y = name_y - 6.5 * mm
    c.setFont("Helvetica-Oblique", 10.5)
    c.setFillColor(BURGUNDY)
    c.drawCentredString(PAGE_W / 2, tagline_y, "Boldly Spiced \u00b7\u00b7\u00b7 Beautifully Balanced")

    # === DECORATIVE DIVIDER ===
    divider_y = tagline_y - 5 * mm
    c.setStrokeColor(GOLD_WARM)
    c.setLineWidth(0.8)
    line_half = 45 * mm
    c.line(PAGE_W / 2 - line_half, divider_y, PAGE_W / 2 + line_half, divider_y)
    # Small diamond in the middle
    diamond_size = 1.5 * mm
    c.setFillColor(GOLD_WARM)
    p = c.beginPath()
    cx, cy = PAGE_W / 2, divider_y
    p.moveTo(cx, cy + diamond_size)
    p.lineTo(cx + diamond_size, cy)
    p.lineTo(cx, cy - diamond_size)
    p.lineTo(cx - diamond_size, cy)
    p.close()
    c.drawPath(p, fill=1, stroke=0)

    # === CONTACT DETAILS (centred, below divider) ===
    contact_y = divider_y - 7 * mm
    c.setFont("Helvetica", 8.5)
    c.setFillColor(GREY_TEXT)
    c.drawCentredString(PAGE_W / 2, contact_y,
        "379 Tonge Moor Road, BL2 2JR, Greater Manchester, UK")

    contact_y2 = contact_y - 4.5 * mm
    c.setFont("Helvetica", 8.5)
    c.drawCentredString(PAGE_W / 2, contact_y2,
        "+44 7833 679824   |   virtual_assistant2@aol.com   |   hibiscusplus.co.uk")

    # === COMPANY NUMBER (subtle, bottom centre) ===
    c.setFont("Helvetica", 7)
    c.setFillColor(GREY_LIGHT)
    c.drawCentredString(PAGE_W / 2, 9 * mm,
        "HIBISCUSPLUS LIMITED  |  Registered in England & Wales  |  Company No. 17024055")

    # === SUBTLE CORNER FLOURISHES (small decorative arcs) ===
    c.setStrokeColor(Color(GOLD_WARM.red, GOLD_WARM.green, GOLD_WARM.blue, 0.3))
    c.setLineWidth(0.4)
    # Top-left
    c.arc(8 * mm, PAGE_H - 18 * mm, 22 * mm, PAGE_H - 8 * mm, 90, 90)
    # Top-right
    c.arc(PAGE_W - 22 * mm, PAGE_H - 18 * mm, PAGE_W - 8 * mm, PAGE_H - 8 * mm, 0, 90)
    # Bottom-left
    c.arc(8 * mm, 8 * mm, 22 * mm, 18 * mm, 180, 90)
    # Bottom-right
    c.arc(PAGE_W - 22 * mm, 8 * mm, PAGE_W - 8 * mm, 18 * mm, 270, 90)

    c.save()
    print(f"Letterhead saved to: {output_path}")
    return output_path


if __name__ == "__main__":
    output = "/app/frontend/public/HibiscusPlus_Letterhead.pdf"
    create_letterhead(output)
    print("Done!")
