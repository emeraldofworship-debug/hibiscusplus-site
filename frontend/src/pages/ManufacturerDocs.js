import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Leaf, Copy, Download, Mail, FileText, Package } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';

const ManufacturerDocs = () => {
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const downloadAsFile = (content, filename) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`${filename} downloaded!`);
  };

  const downloadAllDocs = () => {
    // Download all three documents
    downloadAsFile(emailUKLooseLeaf, 'HibiscusPlus_Email_UK_Loose_Leaf_Tea.txt');
    setTimeout(() => {
      downloadAsFile(emailTeaPeople, 'HibiscusPlus_Email_Tea_People.txt');
    }, 500);
    setTimeout(() => {
      downloadAsFile(recipeSpec, 'HibiscusPlus_Recipe_Specifications.txt');
    }, 1000);
    setTimeout(() => {
      downloadAsFile(packagingBrief, 'HibiscusPlus_Packaging_Brief.txt');
    }, 1500);
    toast.success('Downloading all documents!');
  };

  // Email Template for UK Loose Leaf Tea Company
  const emailUKLooseLeaf = `Subject: Custom Recipe Tea Bags + Dropshipping Inquiry - HibiscusPlus

Dear UK Loose Leaf Tea Company,

I hope this email finds you well.

My name is [Your Name], and I'm the founder of HibiscusPlus, a new wellness brand based in Manchester specializing in premium hibiscus tea blends with Nigerian heritage influences.

I came across your services for custom recipe blending, bagging, and dropshipping, and I'm very interested in partnering with you for our product line.

**About HibiscusPlus:**
- Focus: Premium hibiscus tea blends with herbs and spices
- Target Market: UK wellness consumers, Manchester market stalls initially
- Unique Selling Point: Traditional Nigerian Zobo recipes with modern wellness benefits
- Business Model: E-commerce with dropshipping fulfillment

**Our Requirements:**

1. **Custom Recipe Formulation:**
   - We have 6 signature recipes featuring hibiscus as the primary ingredient
   - Recipes include: Nigerian Zobo (with clove & ginger), Tropical Pineapple, Caramel Vanilla, and others
   - All recipes are finalized with exact measurements (attached)
   - We require NDA for recipe protection

2. **Tea Bag Production:**
   - Standard 62.5mm square tea bags (2-7g per bag depending on blend)
   - 20 tea bags per retail box
   - Biodegradable/plastic-free bags preferred
   - Food-grade, sealed for freshness

3. **Packaging:**
   - Custom branded boxes (HibiscusPlus branding)
   - Include: ingredient list, allergen warnings, brewing instructions
   - Eco-friendly materials preferred
   - We can provide design artwork

4. **Dropshipping/Fulfillment:**
   - Direct shipping to end customers from your facility
   - Individual order fulfillment (not just bulk wholesale)
   - UK-wide delivery
   - Ability to handle orders from our e-commerce website

5. **Initial Volumes:**
   - Starting: 100-200 units per SKU (6 SKUs total = 600-1200 units)
   - Projected growth: 500-1000 units per SKU within 6 months
   - Monthly recurring orders expected

**Information Needed:**

1. Can you accommodate our dropshipping model (ship individual orders to customers)?
2. Minimum order quantities per SKU?
3. Lead time from order to production to delivery?
4. Pricing structure:
   - Per unit cost at different volume tiers
   - Packaging costs (boxes, labels)
   - Fulfillment/shipping costs per order
5. NDA availability for recipe protection?
6. Can you source all ingredients (hibiscus, ginger, cloves, etc.) or do we supply?
7. Quality certifications (organic options, food safety)?
8. Setup costs or development fees?
9. Sample availability before bulk order?

**Next Steps:**
I would be delighted to schedule a call to discuss our requirements in detail and explore how we can work together. I've attached our recipe specifications and packaging brief for your review.

Could you please provide:
- Your service brochure/pricing information
- Samples of your tea bag quality
- Case studies of similar partnerships

Thank you for your time and consideration. I look forward to the possibility of partnering with you to bring HibiscusPlus to life.

Best regards,

[Your Name]
Founder, HibiscusPlus
📧 hello@hibiscusplus.co.uk
📱 +44 161 123 4567
🌐 www.hibiscusplus.co.uk
📍 Manchester, UK

🌺 Traditional Nigerian wellness meets modern tea culture

---
Attachments:
1. HibiscusPlus_Recipe_Specifications.pdf
2. HibiscusPlus_Packaging_Brief.pdf
3. HibiscusPlus_Brand_Guidelines.pdf (optional)`;

  // Email Template for Tea People
  const emailTeaPeople = `Subject: Bespoke Tea Blending + Fulfillment Partnership Inquiry - HibiscusPlus

Dear Tea People Team,

Good day!

I'm reaching out from HibiscusPlus, a Manchester-based wellness tea brand launching in early 2025, to inquire about your bespoke tea blending and fulfillment services.

I was impressed to learn about your 100% biodegradable plastic-free teabags and custom packaging capabilities. Your commitment to quality aligns perfectly with our brand values.

**About Our Brand:**
HibiscusPlus celebrates Nigerian tea heritage through premium hibiscus blends featuring traditional Zobo recipes combined with wellness-focused herbs and spices.

**What We Need:**

1. **Bespoke Blending Services:**
   - 6 custom hibiscus-based recipes (recipes attached)
   - Signature blend: Nigerian Zobo with clove and ginger
   - Additional blends: tropical, dessert-inspired, and wellness-focused

2. **Biodegradable Tea Bags:**
   - Using your Fuso-FSP-100S machine for plastic-free bags
   - 20 tea bags per retail unit
   - Premium quality that reflects our brand positioning

3. **Custom Packaging:**
   - Branded boxes with our logo and design
   - Full artwork support (or we can provide print-ready files)
   - Eco-friendly materials essential to our brand identity

4. **Fulfillment Services:**
   - Palletizing for our future warehouse OR
   - Direct delivery to wholesale clients OR
   - Individual customer order fulfillment (if available)
   - What fulfillment options do you offer?

**Volume Requirements:**
- Initial order: 100 units per SKU (6 SKUs = 600 units minimum)
- Your minimum is 100 units per SKU - this works perfectly for us!
- Scale to 500-1000+ units per SKU within 6-12 months

**Questions:**

1. Can you accommodate individual order fulfillment/dropshipping?
2. Pricing breakdown at 100, 500, 1000 unit volumes per SKU
3. Lead time from order confirmation to delivery?
4. Ingredient sourcing - can you source hibiscus, ginger, cloves, etc.?
5. Organic certification available?
6. NDA for recipe confidentiality?
7. Sample batches available before full production?
8. Packaging design support - what do you provide vs. what we need to supply?

I'm attaching our detailed recipe specifications and packaging brief for your review. I'd love to schedule a call to discuss how we can work together.

Could you please send:
- Your service overview and pricing guide
- Examples of your custom packaging work
- Tea bag samples (if possible)

Thank you for your consideration. I'm excited about the possibility of working with a UK manufacturer committed to sustainability and quality.

Warm regards,

[Your Name]
Founder, HibiscusPlus
hello@hibiscusplus.co.uk
+44 161 123 4567
Manchester, UK

Natural wellness through Nigerian tea heritage`;

  // Recipe Specifications Document
  const recipeSpec = `═══════════════════════════════════════════════════════════
           HIBISCUSPLUS RECIPE SPECIFICATIONS
                  Confidential & Proprietary
═══════════════════════════════════════════════════════════

Company: HibiscusPlus
Contact: [Your Name]
Email: hello@hibiscusplus.co.uk
Date: January 2025
Version: 1.0

CONFIDENTIALITY NOTICE:
This document contains proprietary recipes and trade secrets of HibiscusPlus.
Unauthorized reproduction or disclosure is prohibited.
NDA required before production.

═══════════════════════════════════════════════════════════

TABLE OF CONTENTS:
1. Recipe #1: Signature Nigerian Zobo (Original) ⭐ FLAGSHIP
2. Recipe #2: Tropical Pineapple Zobo
3. Recipe #3: Caramel Vanilla Zobo Delight
4. Recipe #4: Watermelon Lime Zobo Cooler
5. Recipe #5: Spiced Cinnamon Vanilla Zobo
6. Recipe #6: Citrus Lime Zing Zobo

GENERAL SPECIFICATIONS FOR ALL BLENDS:
- Target weight per tea bag: 2-3g (depending on blend density)
- 20 tea bags per retail box
- Total net weight per box: 40-60g
- Biodegradable tea bag material preferred
- Food-grade, heat-sealed for freshness
- 24-month shelf life target

═══════════════════════════════════════════════════════════

RECIPE #1: SIGNATURE NIGERIAN ZOBO (ORIGINAL) ⭐ FLAGSHIP
═══════════════════════════════════════════════════════════

Product Name: Signature Nigerian Zobo Tea
Category: Immunity Boost
Target Weight per Bag: 3g

INGREDIENT COMPOSITION (per 100g finished blend):

Primary Ingredients:
- Dried hibiscus flowers (zobo leaves): 60g (60%)
- Fresh ginger, dried & ground: 15g (15%)
- Whole cloves, crushed: 8g (8%)
- Cinnamon bark, broken: 10g (10%)
- Dried pineapple pieces (optional for sweetness): 5g (5%)
- Natural flavoring (if needed): 2g (2%)

Total: 100g

SCALED FOR 1 TEA BAG (3g):
- Dried hibiscus: 1.8g
- Dried ginger: 0.45g
- Cloves: 0.24g
- Cinnamon: 0.30g
- Dried pineapple: 0.15g
- Natural flavoring: 0.06g

INGREDIENT SPECIFICATIONS:
- Hibiscus: Organic preferred, bright red color, no stems
- Ginger: Dried, finely ground or small pieces
- Cloves: Whole cloves, crushed to 2-3mm pieces
- Cinnamon: Ceylon or Cassia, broken bark pieces
- Pineapple: Freeze-dried or dehydrated, small pieces

BREWING INSTRUCTIONS (for packaging):
"Add 1 tea bag to 200ml boiling water. Steep 5-7 minutes.
Enjoy hot or serve chilled over ice. Add honey to taste."

ALLERGEN INFORMATION:
"May contain traces of nuts, celery, mustard. Gluten-free, Dairy-free, Vegan."

HEALTH BENEFITS (for marketing):
"Traditional Nigerian wellness drink. Boosts immunity, aids digestion,
rich in vitamin C and antioxidants. Natural energy support."

FLAVOR PROFILE:
Tart hibiscus base with warm ginger spice, aromatic clove notes,
sweet cinnamon finish. Balanced and refreshing.

QUALITY CONTROL NOTES:
- Ensure strong hibiscus color when brewed (deep red/magenta)
- Ginger should be noticeable but not overpowering
- Cloves should be subtle background note
- No artificial colors or flavors

═══════════════════════════════════════════════════════════

RECIPE #2: TROPICAL PINEAPPLE ZOBO
═══════════════════════════════════════════════════════════

Product Name: Tropical Pineapple Zobo Splash
Category: Immunity Boost
Target Weight per Bag: 2.5g

INGREDIENT COMPOSITION (per 100g):
- Dried hibiscus flowers: 55g (55%)
- Dried pineapple chunks: 25g (25%)
- Dried ginger, ground: 10g (10%)
- Dried mint leaves: 8g (8%)
- Natural pineapple flavoring: 2g (2%)

BREWING INSTRUCTIONS:
"Steep 1 bag in 200ml hot water for 8-10 minutes.
Chill and serve over ice with fresh mint. Naturally sweet and refreshing."

ALLERGEN INFO: Gluten-free, Dairy-free, Vegan

BENEFITS: Tropical immunity booster, digestive aid, vitamin C rich

═══════════════════════════════════════════════════════════

RECIPE #3: CARAMEL VANILLA ZOBO DELIGHT
═══════════════════════════════════════════════════════════

Product Name: Caramel Vanilla Zobo Delight
Category: Stress Relief / Dessert Tea
Target Weight per Bag: 2.5g

INGREDIENT COMPOSITION (per 100g):
- Dried hibiscus flowers: 50g (50%)
- Rooibos tea (for sweetness): 20g (20%)
- Natural vanilla extract (dried): 5g (5%)
- Natural caramel flavoring: 3g (3%)
- Cinnamon powder: 12g (12%)
- Honeybush tea: 10g (10%)

BREWING INSTRUCTIONS:
"Steep 1 bag in 200ml hot water for 5-7 minutes.
Add honey or cream for indulgent treat. Perfect evening tea."

ALLERGEN INFO: Gluten-free, Dairy-free (unless cream added), Vegan

BENEFITS: Comforting, reduces stress, satisfies sweet cravings naturally

═══════════════════════════════════════════════════════════

RECIPE #4: WATERMELON LIME ZOBO COOLER
═══════════════════════════════════════════════════════════

Product Name: Watermelon Lime Zobo Cooler
Category: Heart Health / Hydration
Target Weight per Bag: 2.5g

INGREDIENT COMPOSITION (per 100g):
- Dried hibiscus flowers: 60g (60%)
- Freeze-dried watermelon: 15g (15%)
- Dried lime peel: 10g (10%)
- Dried mint leaves: 10g (10%)
- Natural watermelon flavoring: 5g (5%)

BREWING INSTRUCTIONS:
"Steep in hot water 5 minutes or cold brew overnight.
Serve chilled with lime wedge. Ultimate summer refreshment."

ALLERGEN INFO: Gluten-free, Dairy-free, Vegan

BENEFITS: Hydration, heart health support, rich in lycopene

═══════════════════════════════════════════════════════════

RECIPE #5: SPICED CINNAMON VANILLA ZOBO
═══════════════════════════════════════════════════════════

Product Name: Spiced Cinnamon Vanilla Zobo
Category: Digestive Health / Warming
Target Weight per Bag: 3g

INGREDIENT COMPOSITION (per 100g):
- Dried hibiscus flowers: 50g (50%)
- Cinnamon bark pieces: 20g (20%)
- Whole cloves: 8g (8%)
- Star anise pieces: 7g (7%)
- Natural vanilla: 5g (5%)
- Fennel seeds: 10g (10%)

BREWING INSTRUCTIONS:
"Steep 1 bag in 200ml hot water for 10 minutes.
Serve warm. Perfect for cold evenings and after meals."

ALLERGEN INFO: May contain celery. Gluten-free, Dairy-free, Vegan

BENEFITS: Warming digestive aid, regulates blood sugar, improves circulation

═══════════════════════════════════════════════════════════

RECIPE #6: CITRUS LIME ZING ZOBO
═══════════════════════════════════════════════════════════

Product Name: Citrus Lime Zing Zobo
Category: Immunity Boost / Detox
Target Weight per Bag: 2.5g

INGREDIENT COMPOSITION (per 100g):
- Dried hibiscus flowers: 55g (55%)
- Dried lime peel and zest: 20g (20%)
- Dried ginger: 15g (15%)
- Lemongrass: 8g (8%)
- Natural citrus flavoring: 2g (2%)

BREWING INSTRUCTIONS:
"Steep 1 bag in hot water 7 minutes.
Add fresh lime juice if desired. Serve hot or iced."

ALLERGEN INFO: Gluten-free, Dairy-free, Vegan

BENEFITS: Powerful detox, high vitamin C, aids digestion, alkalizing

═══════════════════════════════════════════════════════════

QUALITY STANDARDS FOR ALL RECIPES:
═══════════════════════════════════════════════════════════

1. INGREDIENT QUALITY:
   - Organic ingredients preferred where available
   - No artificial colors, flavors, or preservatives
   - Food-grade quality, properly dried and stored
   - No pesticides or contaminants

2. PRODUCTION REQUIREMENTS:
   - GMP (Good Manufacturing Practice) facility
   - HACCP compliant
   - Food safety certifications
   - Allergen control procedures

3. PACKAGING REQUIREMENTS:
   - Individual tea bags: Food-grade, biodegradable
   - Sealed to maintain freshness
   - Moisture-proof for 24-month shelf life
   - Heat-sealed, no staples

4. TESTING:
   - Microbiological testing required
   - Heavy metal testing for hibiscus
   - Batch consistency testing
   - Quality control sample from each batch

5. LABELING REQUIREMENTS:
   All boxes must include:
   - Full ingredient list (descending order by weight)
   - Allergen warnings
   - Net weight
   - Batch number and best before date
   - Brewing instructions
   - HibiscusPlus contact information
   - "Made in UK" statement

═══════════════════════════════════════════════════════════

STORAGE AND HANDLING:
═══════════════════════════════════════════════════════════

Store finished products in:
- Cool, dry environment (below 25°C)
- Away from direct sunlight
- Protected from moisture
- Away from strong odors

Shelf life: 24 months from production date when properly stored

═══════════════════════════════════════════════════════════

CONTACT FOR QUESTIONS:
═══════════════════════════════════════════════════════════

Technical Contact: [Your Name]
Email: hello@hibiscusplus.co.uk
Phone: +44 161 123 4567

Please do not reproduce or share these recipes without written permission.

END OF RECIPE SPECIFICATIONS DOCUMENT`;

  // Packaging Brief
  const packagingBrief = `═══════════════════════════════════════════════════════════
           HIBISCUSPLUS PACKAGING BRIEF
                     Version 1.0
═══════════════════════════════════════════════════════════

Company: HibiscusPlus
Contact: [Your Name]
Email: hello@hibiscusplus.co.uk
Date: January 2025

═══════════════════════════════════════════════════════════
1. BRAND OVERVIEW
═══════════════════════════════════════════════════════════

Brand Name: HibiscusPlus
Tagline: "Natural wellness through Nigerian tea heritage"

Brand Positioning:
- Premium wellness teas with Nigerian Zobo heritage
- Modern meets traditional
- Eco-conscious and health-focused
- Manchester-based with global inspiration

Target Audience:
- Health-conscious consumers 25-45 years
- Wellness enthusiasts
- Nigerian diaspora
- Tea lovers seeking unique flavors
- Eco-conscious shoppers

═══════════════════════════════════════════════════════════
2. BRAND COLORS & VISUAL IDENTITY
═══════════════════════════════════════════════════════════

PRIMARY COLORS:
- Rose Red: #DC143C (Crimson - represents hibiscus)
- Deep Rose: #E11D48
- Purple: #9333EA (Secondary accent)

SECONDARY COLORS:
- Rose 50: #FFF1F2 (Light backgrounds)
- Rose 100: #FFE4E6 (Soft accents)
- White: #FFFFFF (Clean base)
- Charcoal: #111827 (Text/footer)

COLOR PSYCHOLOGY:
- Rose/Red: Energy, vitality, hibiscus flower
- Purple: Wellness, premium quality
- White: Purity, cleanliness, natural

TYPOGRAPHY:
- Headings: Playfair Display (elegant serif)
- Body: Poppins (modern, clean sans-serif)

LOGO:
- [Logo file to be provided]
- Leaf icon with "HibiscusPlus" text
- Gradient from rose to purple
- Available formats: PNG (transparent), SVG, AI

═══════════════════════════════════════════════════════════
3. PACKAGING SPECIFICATIONS - RETAIL BOXES
═══════════════════════════════════════════════════════════

PRODUCT: Tea Bag Boxes (20 tea bags per box)

BOX DIMENSIONS:
- Preferred size: 12cm (W) x 8cm (D) x 6cm (H)
- Or similar standard tea box size
- Must fit 20 tea bags comfortably
- Stackable for retail display

MATERIAL:
- Recyclable cardboard/paperboard
- FSC certified preferred
- Food-grade coating (if needed for freshness)
- Minimum 350gsm board weight
- Matte or soft-touch finish preferred

BOX STYLE:
- Tuck-top box with lift-off lid OR
- Side-opening flip box
- Easy to open and close
- Professional retail appearance

PRINTING:
- Full color CMYK
- High-resolution graphics
- Matte finish (no glossy unless on logo only)

═══════════════════════════════════════════════════════════
4. PACKAGING DESIGN ELEMENTS
═══════════════════════════════════════════════════════════

FRONT PANEL (Primary Display):

[TOP SECTION]
- HibiscusPlus logo (centered or left)
- Brand colors: rose to purple gradient accent

[MIDDLE SECTION - HERO]
- Product name in large, bold text
  Example: "SIGNATURE NIGERIAN ZOBO"
- Beautiful hibiscus flower graphic/illustration
- Subtle pattern or texture (Nigerian-inspired optional)

[BOTTOM SECTION]
- Key benefits in icons or short text
  Examples: "Immunity Boost" "Vitamin C Rich" "Natural Energy"
- "20 Biodegradable Tea Bags" badge
- Net weight: "40g" or "60g" depending on blend

DESIGN STYLE:
- Clean, modern, premium
- Not too busy - let product name shine
- Botanical elements (hibiscus flower, leaves)
- Warm, inviting, natural feel

═══════════════════════════════════════════════════════════

BACK PANEL:

[REQUIRED INFORMATION]

1. PRODUCT DESCRIPTION (short paragraph):
   "Experience traditional Nigerian wellness with our Signature Zobo blend.
   Featuring premium hibiscus flowers combined with warming ginger and
   aromatic spices. Rich in vitamin C and antioxidants."

2. INGREDIENTS LIST:
   "Ingredients: Dried hibiscus flowers (60%), dried ginger (15%),
   crushed cloves (8%), cinnamon bark (10%), dried pineapple (5%),
   natural flavoring (2%)"
   [Specific to each blend]

3. ALLERGEN INFORMATION:
   ⚠️ ALLERGEN WARNING: May contain traces of nuts, celery, mustard.
   Produced in a facility that handles allergens.
   ✓ Gluten-free, Dairy-free, Vegan

4. BREWING INSTRUCTIONS:
   Icon + Text format
   📖 "Add 1 tea bag to 200ml boiling water
   ⏱️ Steep for 5-7 minutes
   ☕ Enjoy hot or serve chilled over ice
   🍯 Add honey to taste (optional)"

5. STORAGE INSTRUCTIONS:
   "Store in a cool, dry place away from direct sunlight.
   Seal box after opening to maintain freshness."

6. COMPANY INFORMATION:
   HibiscusPlus
   Manchester, UK
   hello@hibiscusplus.co.uk
   www.hibiscusplus.co.uk
   @hibiscusplus

7. LEGAL REQUIREMENTS:
   - Net weight: "40g (20 x 2g tea bags)"
   - Batch number: [Space for batch code]
   - Best before: [Space for date - 24 months from production]
   - Barcode: [Space for EAN-13 barcode]
   - "Made in UK" or "Blended in UK"
   - "100% Biodegradable Tea Bags" badge
   - Recycling symbol: "Recycle this box"

═══════════════════════════════════════════════════════════

SIDE PANELS:

LEFT SIDE:
- HibiscusPlus logo (vertical)
- Product name
- Category icon (e.g., leaf for wellness)

RIGHT SIDE:
- Tagline: "Natural wellness through Nigerian tea heritage"
- Social media icons and handles
- Website URL

TOP PANEL:
- Product name
- Simple pattern or color block

═══════════════════════════════════════════════════════════
5. INDIVIDUAL TEA BAG PACKAGING
═══════════════════════════════════════════════════════════

TEA BAG SPECIFICATIONS:
- Size: 62.5mm square (standard)
- Material: Biodegradable, plastic-free preferred
- Heat-sealed on all edges
- String attached with tag (optional but preferred)

TEA BAG TAG (if applicable):
- Small rectangular tag (3cm x 2cm)
- HibiscusPlus mini logo on front
- Brewing time on back: "Steep 5-7 min"
- Sustainably sourced paper

INDIVIDUAL WRAPPING (Optional):
If tea bags are individually wrapped:
- Clear biodegradable film OR
- Paper envelopes with small window
- HibiscusPlus logo on each wrapper
- Product name printed

═══════════════════════════════════════════════════════════
6. DIFFERENT DESIGNS FOR EACH PRODUCT LINE
═══════════════════════════════════════════════════════════

While maintaining consistent branding, each blend should have
unique visual identity:

1. SIGNATURE NIGERIAN ZOBO:
   - Deep red/crimson dominant color
   - Hibiscus flower illustration (realistic or stylized)
   - Nigerian pattern accent (subtle)
   - "FLAGSHIP BLEND" badge

2. TROPICAL PINEAPPLE ZOBO:
   - Bright, fresh colors (yellow-orange accents)
   - Pineapple illustration
   - Tropical leaf patterns
   - "REFRESHING" badge

3. CARAMEL VANILLA ZOBO:
   - Warm browns and cream colors
   - Dessert-inspired feel
   - Vanilla pod illustration
   - "DESSERT TEA" badge

4. WATERMELON LIME ZOBO:
   - Fresh greens and pinks
   - Watermelon slice illustration
   - Cool, summery vibe
   - "SUMMER COOLER" badge

5. SPICED CINNAMON VANILLA ZOBO:
   - Warm earth tones (browns, oranges)
   - Cinnamon stick illustration
   - Cozy, warming feel
   - "WARMING BLEND" badge

6. CITRUS LIME ZING ZOBO:
   - Bright citrus colors (lime green, yellow)
   - Lime illustration
   - Fresh, zesty feel
   - "DETOX" badge

COLOR CODING SYSTEM:
Each blend gets a unique accent color while maintaining
core HibiscusPlus branding (rose/purple always present)

═══════════════════════════════════════════════════════════
7. SUSTAINABILITY & ECO-MESSAGING
═══════════════════════════════════════════════════════════

IMPORTANT: Sustainability is core to our brand

Include on packaging:
✓ "100% Biodegradable Tea Bags"
✓ "Plastic-Free Packaging"
✓ "Recyclable Box - Please Recycle"
✓ "FSC Certified" (if using FSC materials)
✓ "Organic Ingredients" (where applicable)

Icons to include:
- Recycling symbol
- Leaf icon for eco-friendly
- FSC logo (if applicable)
- Vegan society logo (optional)

═══════════════════════════════════════════════════════════
8. QUALITY & PREMIUM FEEL
═══════════════════════════════════════════════════════════

Packaging should communicate premium quality:

TEXTURE:
- Matte or soft-touch lamination
- Embossed logo (if budget allows)
- High-quality printing

FINISHING OPTIONS (if budget allows):
- Foil stamping for logo (rose gold or metallic)
- Spot UV on hibiscus flower graphics
- Embossing for product name

WINDOWS:
- Consider small window on front to show tea bags inside
- Clear biodegradable film for window
- Builds trust and shows product quality

═══════════════════════════════════════════════════════════
9. RETAIL DISPLAY CONSIDERATIONS
═══════════════════════════════════════════════════════════

Packaging must work for:
1. MARKET STALLS:
   - Eye-catching from 3 meters away
   - Stackable for table display
   - Easy to read product names

2. RETAIL SHELVES:
   - Front-facing display works
   - Side panel visible when stacked
   - Logo visible from any angle

3. E-COMMERCE:
   - Photographs well
   - Professional appearance
   - Gift-worthy presentation

═══════════════════════════════════════════════════════════
10. INNER PACKAGING FOR FRESHNESS
═══════════════════════════════════════════════════════════

Inside retail box:
- Food-grade biodegradable liner bag (optional)
- Sealed to maintain freshness
- Easy tear-open
- Resealable if possible (zip-lock or fold-over)

Alternatively:
- Individual tea bag wrappers provide freshness
- No additional liner needed

═══════════════════════════════════════════════════════════
11. MULTI-PACK / VARIETY PACK DESIGN
═══════════════════════════════════════════════════════════

For future variety packs (multiple blends in one box):

BOX SIZE: Larger to accommodate 6 different blends
DESIGN: Showcase all 6 product images on front
CONTENTS: 3 bags of each blend (18 total) OR 4 bags each (24 total)
PRICING: Premium bundle pricing, save £2-5 vs individual

═══════════════════════════════════════════════════════════
12. BUDGET & VOLUME
═══════════════════════════════════════════════════════════

INITIAL ORDER:
- 100-200 boxes per SKU (6 SKUs)
- Total: 600-1200 boxes

FUTURE GROWTH:
- Scale to 500-1000 boxes per SKU within 6 months
- Consider bulk printing for cost savings

BUDGET EXPECTATIONS:
- Willing to invest in quality packaging
- Premium positioning justifies higher cost
- Sustainable materials prioritized

═══════════════════════════════════════════════════════════
13. DESIGN SUPPORT NEEDED
═══════════════════════════════════════════════════════════

We can provide:
✓ Logo files (PNG, SVG, AI)
✓ Brand colors (HEX codes)
✓ Font specifications
✓ Content (all text for packaging)
✓ Product photography (if needed)

We need support with:
- Professional packaging layout/design
- Print-ready artwork (with bleed and crop marks)
- Product illustrations/graphics
- Color proofing and mockups

═══════════════════════════════════════════════════════════
14. TIMELINE & DELIVERY
═══════════════════════════════════════════════════════════

DESIRED TIMELINE:
1. Design concepts: 1-2 weeks
2. Revisions and approval: 1 week
3. Print samples: 1 week
4. Final production: 2-3 weeks
5. Delivery to manufacturer: As needed

Total timeline: 5-7 weeks ideal

DELIVERY:
- Boxes delivered flat-packed to manufacturer
- Or delivered pre-assembled if preferred
- Include assembly instructions if flat-packed

═══════════════════════════════════════════════════════════
15. REGULATORY COMPLIANCE
═══════════════════════════════════════════════════════════

Packaging must comply with UK food labeling laws:
✓ Clear ingredient list (EU Regulation 1169/2011)
✓ Allergen information (bold or highlighted)
✓ Net weight declaration
✓ Date marking (best before)
✓ Name and address of food business
✓ Country of origin (if required)
✓ Storage conditions
✓ Instructions for use

═══════════════════════════════════════════════════════════
16. CONTACT & APPROVALS
═══════════════════════════════════════════════════════════

All packaging designs require approval before production.

Design Contact:
[Your Name]
HibiscusPlus
Email: hello@hibiscusplus.co.uk
Phone: +44 161 123 4567

Please submit:
- 3D mockups for review
- Flat design layouts
- Color proofs
- Physical samples (if possible)

Response time: 48-72 hours for feedback

═══════════════════════════════════════════════════════════

END OF PACKAGING BRIEF

Thank you for helping bring HibiscusPlus to life!

═══════════════════════════════════════════════════════════`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/eei6kk0o_HibiscuPlus_20260227_093727_0000%20%283%29%20%281%29.png" alt="HibiscusPlus" className="h-16 w-auto object-contain" data-testid="header-logo" />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-700 hover:text-rose-600 transition-colors">Home</a>
              <a href="/suppliers" className="text-gray-700 hover:text-rose-600 transition-colors">Suppliers</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-200">Ready to Send</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Manufacturer Documents
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Professional emails, recipe specifications, and packaging brief - ready to send to manufacturers
            </p>
            
            {/* Download All Button */}
            <Button 
              onClick={downloadAllDocs}
              size="lg"
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              <Download className="mr-2 h-5 w-5" />
              Download All Documents (4 Files)
            </Button>
          </div>

          {/* Email Templates */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-rose-600" />
              <h3 className="text-3xl font-bold">Email Templates</h3>
            </div>

            {/* UK Loose Leaf Tea Company Email */}
            <Card className="mb-6 border-rose-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">UK Loose Leaf Tea Company</CardTitle>
                    <CardDescription>Recommended first contact - explicit dropshipping service</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => downloadAsFile(emailUKLooseLeaf, 'HibiscusPlus_Email_UK_Loose_Leaf_Tea.txt')}
                      variant="outline"
                      className="border-rose-300 text-rose-600 hover:bg-rose-50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(emailUKLooseLeaf, 'Email template')}
                      className="bg-rose-600 hover:bg-rose-700"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <pre className="text-sm whitespace-pre-wrap font-sans text-gray-700 max-h-96 overflow-y-auto">
                    {emailUKLooseLeaf}
                  </pre>
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>📧 Send to:</strong> sales@theuklooseleafteacompany.co.uk
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tea People Email */}
            <Card className="mb-6 border-rose-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">Tea People</CardTitle>
                    <CardDescription>Biodegradable bags, custom packaging, fulfillment options</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => downloadAsFile(emailTeaPeople, 'HibiscusPlus_Email_Tea_People.txt')}
                      variant="outline"
                      className="border-rose-300 text-rose-600 hover:bg-rose-50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(emailTeaPeople, 'Email template')}
                      className="bg-rose-600 hover:bg-rose-700"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <pre className="text-sm whitespace-pre-wrap font-sans text-gray-700 max-h-96 overflow-y-auto">
                    {emailTeaPeople}
                  </pre>
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>📧 Contact via:</strong> https://teapeople.co.uk/pages/contact
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recipe Specifications */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-rose-600" />
              <h3 className="text-3xl font-bold">Recipe Specifications</h3>
            </div>

            <Card className="border-rose-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">Complete Recipe Document</CardTitle>
                    <CardDescription>All 6 recipes with exact measurements, ingredients, and quality standards</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => downloadAsFile(recipeSpec, 'HibiscusPlus_Recipe_Specifications.txt')}
                      variant="outline"
                      className="border-rose-300 text-rose-600 hover:bg-rose-50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(recipeSpec, 'Recipe specifications')}
                      className="bg-rose-600 hover:bg-rose-700"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <pre className="text-xs whitespace-pre-wrap font-mono text-gray-700 max-h-96 overflow-y-auto">
                    {recipeSpec}
                  </pre>
                </div>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>✓ Includes:</strong> Signature Zobo recipe with exact grams per ingredient, 
                    all 6 blends, allergen info, brewing instructions, quality standards
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Packaging Brief */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-6 w-6 text-rose-600" />
              <h3 className="text-3xl font-bold">Packaging Brief</h3>
            </div>

            <Card className="border-rose-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">Complete Packaging Specifications</CardTitle>
                    <CardDescription>Box design, branding, labeling requirements, sustainability standards</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => downloadAsFile(packagingBrief, 'HibiscusPlus_Packaging_Brief.txt')}
                      variant="outline"
                      className="border-rose-300 text-rose-600 hover:bg-rose-50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(packagingBrief, 'Packaging brief')}
                      className="bg-rose-600 hover:bg-rose-700"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <pre className="text-xs whitespace-pre-wrap font-mono text-gray-700 max-h-96 overflow-y-auto">
                    {packagingBrief}
                  </pre>
                </div>
                <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>✓ Includes:</strong> Brand colors, box dimensions, labeling requirements, 
                    sustainability standards, legal compliance, design elements
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl">📋 Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Customize the Documents</h4>
                    <p className="text-sm text-gray-600">
                      Replace [Your Name] with your actual name in all three documents
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Send Email to UK Loose Leaf Tea Company</h4>
                    <p className="text-sm text-gray-600">
                      Email: sales@theuklooseleafteacompany.co.uk
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Attach: Recipe Specifications + Packaging Brief (copy into Word/PDF)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Send Email to Tea People</h4>
                    <p className="text-sm text-gray-600">
                      Contact via their website form with same attachments
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Follow Up</h4>
                    <p className="text-sm text-gray-600">
                      If no response in 3-5 business days, send a polite follow-up email
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Review Quotes</h4>
                    <p className="text-sm text-gray-600">
                      Compare pricing, MOQs, lead times, and dropshipping capabilities
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white border border-rose-200 rounded-lg">
                <h4 className="font-semibold mb-2 text-rose-700">💡 Pro Tips:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Send emails during UK business hours (9am-5pm)</li>
                  <li>• Be professional but friendly in tone</li>
                  <li>• Ask specific questions about dropshipping</li>
                  <li>• Request samples before committing to large order</li>
                  <li>• Negotiate pricing once you have multiple quotes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-6 w-6 text-rose-400" />
            <h3 className="text-xl font-bold">HibiscusPlus</h3>
          </div>
          <p className="text-gray-400">Ready to launch!</p>
          <p className="text-gray-500 text-sm mt-4">&copy; 2025 HibiscusPlus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ManufacturerDocs;
