import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Leaf, Copy, Mail, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';

const EmailTemplates = () => {
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const templates = {
    samples: {
      title: 'Request Product Samples',
      recipient: 'Herbs & Tea Suppliers',
      subject: 'Sample Request - New UK Wellness Business',
      body: `Dear [Supplier Name],

I hope this email finds you well.

My name is [Your Name], and I'm the founder of HibiscusPlus, a new wellness business based in Manchester, UK, specializing in artisanal hibiscus tea blends and herbal products.

We are currently in the pre-launch phase and are seeking high-quality suppliers for our product range. I came across your company and was impressed by [specific detail about their products/reputation].

I would be grateful if you could provide samples of the following products:
- [Product 1 - e.g., Organic Dried Hibiscus Flowers]
- [Product 2 - e.g., Chamomile Flowers]
- [Product 3 - e.g., Lavender Buds]

Additionally, I would appreciate information on:
1. Minimum order quantities (MOQ)
2. Wholesale pricing structure
3. Lead times for orders
4. Shipping costs to Manchester, UK
5. Quality certifications (organic, etc.)

We anticipate placing regular orders and are looking to establish a long-term partnership with reliable suppliers.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
[Your Name]
HibiscusPlus
Email: hello@hibiscusplus.co.uk
Phone: +44 161 123 4567
Website: [Your Website]
Manchester, UK`
    },
    pricing: {
      title: 'Wholesale Pricing Inquiry',
      recipient: 'All Suppliers',
      subject: 'Wholesale Pricing Inquiry - HibiscusPlus',
      body: `Dear [Supplier Name],

I hope this message finds you well.

I am writing on behalf of HibiscusPlus, a Manchester-based wellness company specializing in premium hibiscus tea blends and natural health products. We are currently sourcing suppliers for our launch and expansion plans.

We are interested in the following products:
- [List specific products]
- [Estimated quantities per month]

Could you please provide us with:
1. Wholesale price list for the above items
2. Volume-based discount structure
3. Minimum order quantities (MOQ)
4. Payment terms and conditions
5. Delivery timeframes to Manchester, UK
6. Any current promotions or introductory offers

We are planning to launch in [Month/Year] and are looking for reliable partners who can support our growth. We anticipate monthly orders and value consistent quality and reliable delivery.

Would it be possible to schedule a brief call to discuss our requirements in more detail?

Thank you for your time, and I look forward to the possibility of working together.

Warm regards,
[Your Name]
Founder, HibiscusPlus
hello@hibiscusplus.co.uk
+44 161 123 4567`
    },
    packaging: {
      title: 'Custom Packaging Quote',
      recipient: 'Packaging Suppliers',
      subject: 'Custom Packaging Quote Request - Tea Blends',
      body: `Dear [Supplier Name],

I hope you're doing well.

My name is [Your Name], and I'm reaching out from HibiscusPlus, a new wellness brand launching in Manchester. We specialize in artisanal hibiscus tea blends and are seeking a packaging partner for our products.

We are interested in custom packaging solutions for our tea blends:

**Packaging Requirements:**
- Product Type: Loose leaf tea blends
- Packaging Style: Stand-up pouches / Kraft paper bags with window
- Sizes Needed: 50g, 100g, 150g
- Quantity: Initial order 500-1000 units (with plans to scale)
- Custom Printing: Yes (our branding/logo)
- Food Grade: Essential
- Resealable: Preferred

**Information Needed:**
1. Price per unit at different quantities
2. Minimum order quantities
3. Lead time for custom printing
4. Design requirements and specifications
5. Sample availability
6. Artwork/design support offered
7. Shipping costs to Manchester

We value quality, sustainability, and competitive pricing. Our brand aesthetic is natural, premium, and eco-conscious, so sustainable packaging options would be particularly appealing.

Would you be able to provide a quote and some samples of similar work?

Thank you for your time. I look forward to your response.

Best wishes,
[Your Name]
HibiscusPlus
hello@hibiscusplus.co.uk
+44 161 123 4567`
    },
    accessories: {
      title: 'Tea Accessories Wholesale Inquiry',
      recipient: 'Tea Ware Suppliers',
      subject: 'Wholesale Inquiry - Tea Infusers & Ceramic Sets',
      body: `Dear [Supplier Name],

Good day!

I am contacting you from HibiscusPlus, a wellness brand based in Manchester, UK, specializing in premium hibiscus tea products. We are currently building our product range and are interested in adding quality tea accessories.

We are particularly interested in:
- Glass tea infuser bottles (300-500ml capacity)
- Ceramic teapot sets (4-piece sets)
- Tea cups and mugs with natural/botanical designs
- Strainers and infusers

**What We Need:**
1. Product catalogue with wholesale pricing
2. Minimum order quantities
3. Bulk discount structure
4. Customization options (branding/logo)
5. Quality certifications
6. Sample availability
7. Lead times and shipping costs to UK

Our target market values quality, aesthetics, and functionality. We're looking for products that align with our natural, wellness-focused brand identity.

Initial orders would be in the range of 50-100 units per item, with potential for significant growth as we expand our online store and presence at Manchester markets.

Would you be able to send us your catalogue and pricing information? We would also appreciate samples if possible.

Thank you for your consideration. I look forward to exploring a potential partnership.

Kind regards,
[Your Name]
Founder, HibiscusPlus
hello@hibiscusplus.co.uk
+44 161 123 4567
Manchester, UK`
    },
    coPacker: {
      title: 'Contract Manufacturing Inquiry',
      recipient: 'Co-Packers / Contract Manufacturers',
      subject: 'Contract Manufacturing Inquiry - Herbal Tea Blends',
      body: `Dear [Company Name],

I hope this email finds you well.

I am writing to inquire about your contract manufacturing services for herbal tea blends. My company, HibiscusPlus, is a Manchester-based wellness brand preparing to launch premium hibiscus tea products in the UK market.

**About Our Business:**
- Product: Artisanal herbal tea blends featuring hibiscus as the primary ingredient
- Target Launch: [Month/Year]
- Distribution: Online sales + Manchester market stalls initially, expanding to wholesale

**Services Required:**
We are interested in understanding your capabilities for:
1. Recipe formulation support (if offered)
2. Sourcing raw materials (herbs, spices)
3. Blending and mixing
4. Packaging (pouches/bags)
5. Labeling
6. Quality control and testing
7. Organic certification support

**Initial Volumes:**
- Starting: 500-1,000 units per blend (5-6 different blends)
- Projected: 5,000-10,000 units within 12 months

**Information Needed:**
1. Your manufacturing capabilities and certifications
2. Minimum order quantities (MOQ)
3. Pricing structure
4. Lead times from order to delivery
5. Quality assurance processes
6. Whether you can accommodate small initial batches
7. Any setup or development fees

Would it be possible to schedule a call or meeting to discuss our requirements in detail? I'd be happy to share more about our product range and vision.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
[Your Name]
Founder, HibiscusPlus
hello@hibiscusplus.co.uk
+44 161 123 4567
www.hibiscusplus.co.uk`
    },
    partnership: {
      title: 'Partnership Proposal',
      recipient: 'Local Manchester Businesses',
      subject: 'Partnership Opportunity - HibiscusPlus Wellness Teas',
      body: `Dear [Business Name],

I hope this message finds you well.

My name is [Your Name], and I'm the founder of HibiscusPlus, a new Manchester-based wellness brand specializing in premium hibiscus tea blends and natural health products.

I've been following your business and am impressed by [specific detail about their business/values]. I believe there could be a fantastic opportunity for collaboration between our brands.

**About HibiscusPlus:**
- Premium artisanal hibiscus tea blends
- Focus on natural wellness and health benefits
- Locally based in Manchester
- Strong emphasis on quality and community

**Partnership Ideas:**
- Wholesale to your store/café
- Co-branded products or special blends
- Joint market stall presence
- Cross-promotion on social media
- Workshop/event collaboration

We're committed to building strong local partnerships and supporting the Manchester wellness community. Our products would complement your offering while providing your customers with unique, high-quality tea options.

Would you be interested in a brief meeting to discuss potential collaboration? I'd love to bring some samples and explore how we might work together.

Thank you for considering this opportunity. I look forward to potentially connecting.

Warm regards,
[Your Name]
Founder, HibiscusPlus
hello@hibiscusplus.co.uk
+44 161 123 4567
Instagram: @hibiscusplus`
    }
  };

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
              <a href="/checklist" className="text-gray-700 hover:text-rose-600 transition-colors">Launch Progress</a>
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
            <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-200">Ready-to-Use Templates</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Email Templates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional email templates for contacting suppliers and partners. Simply copy, customize, and send!
            </p>
          </div>

          {/* Templates */}
          <div className="space-y-6">
            {Object.entries(templates).map(([key, template]) => (
              <Card key={key} className="border-rose-200 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl mb-2">{template.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant="outline" className="text-rose-700">{template.recipient}</Badge>
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(template.body, 'Email template')}
                      className="bg-rose-600 hover:bg-rose-700"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Template
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-rose-600" />
                      <span className="font-semibold">Subject Line:</span>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-lg">
                      <p className="text-sm font-medium">{template.subject}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4 text-rose-600" />
                        <span className="font-semibold">Email Body:</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(template.subject, 'Subject line')}
                        className="text-rose-600 hover:bg-rose-50"
                      >
                        <Copy className="mr-2 h-3 w-3" />
                        Copy Subject
                      </Button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <pre className="text-sm whitespace-pre-wrap font-sans text-gray-700">
                        {template.body}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tips Card */}
          <Card className="mt-12 border-rose-200 bg-gradient-to-br from-rose-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl">📧 Email Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-rose-700">Before Sending:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Replace all [placeholders] with your details</li>
                    <li>✓ Personalize with specific details about the supplier</li>
                    <li>✓ Double-check contact information</li>
                    <li>✓ Add your email signature</li>
                    <li>✓ Proofread for typos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-rose-700">Best Practices:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Send during business hours (9am-5pm)</li>
                    <li>✓ Follow up after 3-5 business days if no response</li>
                    <li>✓ Be specific about your needs</li>
                    <li>✓ Show genuine interest in their products</li>
                    <li>✓ Keep it professional but friendly</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-rose-200">
                <h4 className="font-semibold mb-2 text-rose-700">Your Email Signature Template:</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
{`[Your Name]
Founder, HibiscusPlus
📧 hello@hibiscusplus.co.uk
📱 +44 161 123 4567
🌐 www.hibiscusplus.co.uk
📍 Manchester, UK

🌺 Natural healing through hibiscus blends and artisanal wellness
Instagram: @hibiscusplus | Facebook: @hibiscusplus`}
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(`[Your Name]
Founder, HibiscusPlus
📧 hello@hibiscusplus.co.uk
📱 +44 161 123 4567
🌐 www.hibiscusplus.co.uk
📍 Manchester, UK

🌺 Natural healing through hibiscus blends and artisanal wellness
Instagram: @hibiscusplus | Facebook: @hibiscusplus`, 'Email signature')}
                  className="mt-3 border-rose-300 text-rose-600 hover:bg-rose-50"
                >
                  <Copy className="mr-2 h-3 w-3" />
                  Copy Signature
                </Button>
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
          <p className="text-gray-400">Natural healing through hibiscus blends and artisanal wellness</p>
          <p className="text-gray-500 text-sm mt-4">&copy; 2025 HibiscusPlus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EmailTemplates;
