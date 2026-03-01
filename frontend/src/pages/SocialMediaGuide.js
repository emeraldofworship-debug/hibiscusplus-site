import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Leaf, ArrowLeft, Check, Copy, ExternalLink, Mail } from 'lucide-react';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';

const platforms = [
  {
    name: 'Instagram',
    handle: '@hibiscusplus',
    url: 'https://www.instagram.com/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    ),
    color: 'from-pink-500 to-purple-600',
    priority: 'Essential',
    steps: [
      'Go to instagram.com and click "Sign up"',
      'Use your business email: hello@hibiscusplus.co.uk',
      'Choose username: hibiscusplus',
      'Complete profile — add your logo as profile picture',
      'Switch to a Business Account (Settings > Account > Switch to Professional)',
      'Select "Food & Beverage" as your business category',
      'Connect your Facebook Business Page (optional)',
      'Write your bio (see template below)'
    ],
    bioTemplate: `HibiscusPlus | Natural Wellness Teas
Artisanal hibiscus & beetroot tea blends
Handcrafted in Manchester, UK
Recipes | Wellness Tips | Shop Coming Soon
hibiscusplus.co.uk`,
    contentIdeas: [
      'Recipe of the Week — short reels showing tea preparation',
      'Health Benefit spotlights with eye-catching graphics',
      'Behind-the-scenes of product sourcing and blending',
      'Customer testimonials and reviews',
      'Wellness tips and tea-pairing suggestions'
    ]
  },
  {
    name: 'Facebook',
    handle: '@hibiscusplus',
    url: 'https://www.facebook.com/pages/create',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    ),
    color: 'from-blue-600 to-blue-700',
    priority: 'Essential',
    steps: [
      'Go to facebook.com/pages/create',
      'Select "Business or Brand"',
      'Enter page name: HibiscusPlus',
      'Choose category: "Tea Room" or "Health Food Store"',
      'Add your logo and a cover photo of your products',
      'Fill in the About section with company details',
      'Add business contact info and Manchester location',
      'Invite friends and family to like the page'
    ],
    bioTemplate: `HibiscusPlus Limited — Natural Wellness Teas
Premium artisanal hibiscus and beetroot tea blends, handcrafted in Manchester, UK. Explore our recipes and discover the power of hibiscus for heart health, immunity, and wellbeing.
Company No. 17024055`,
    contentIdeas: [
      'Longer-form posts about health benefits with article links',
      'Community polls about favourite flavours',
      'Events — local market appearances in Manchester',
      'Live sessions on tea preparation and health tips',
      'Share blog articles from the website'
    ]
  },
  {
    name: 'TikTok',
    handle: '@hibiscusplus',
    url: 'https://www.tiktok.com/signup',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
    ),
    color: 'from-gray-900 to-gray-800',
    priority: 'High',
    steps: [
      'Download TikTok app or go to tiktok.com/signup',
      'Sign up with business email: hello@hibiscusplus.co.uk',
      'Choose username: hibiscusplus',
      'Switch to Business Account in Settings',
      'Add your logo and write a short bio',
      'Start creating short-form video content'
    ],
    bioTemplate: `HibiscusPlus | Wellness Teas
Natural hibiscus blends from Manchester
Recipes + Health Tips
Link in bio`,
    contentIdeas: [
      'Quick 15-30 second recipe videos with trending audio',
      '"Did you know?" health facts about hibiscus and beetroot',
      'ASMR tea-making content',
      'Taste test reactions and challenges',
      'Trending sounds with tea-related content'
    ]
  },
  {
    name: 'Pinterest',
    handle: 'hibiscusplus',
    url: 'https://www.pinterest.co.uk/business/create/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
    ),
    color: 'from-red-600 to-red-700',
    priority: 'Medium',
    steps: [
      'Go to pinterest.co.uk/business/create/',
      'Create a Business Account',
      'Enter business name: HibiscusPlus',
      'Select "Food and Drink" as your focus',
      'Claim your website when ready',
      'Create boards for: Recipes, Health Benefits, Tea Lifestyle, Products'
    ],
    bioTemplate: `HibiscusPlus | Natural Wellness Teas from Manchester, UK. Premium artisanal hibiscus and beetroot blends for health and wellbeing.`,
    contentIdeas: [
      'Pin recipe cards with beautiful photography',
      'Health infographics about hibiscus and beetroot benefits',
      'Tea and food pairing guides',
      'Lifestyle and wellness boards',
      'Seasonal recipe collections'
    ]
  },
  {
    name: 'LinkedIn',
    handle: 'HibiscusPlus Limited',
    url: 'https://www.linkedin.com/company/setup/new/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
    color: 'from-blue-700 to-blue-800',
    priority: 'Medium',
    steps: [
      'Go to linkedin.com/company/setup/new/',
      'Enter company name: HibiscusPlus Limited',
      'Select "Food and Beverages" as industry',
      'Set company size: 1-10 employees',
      'Add company type: Privately Held',
      'Write an About section highlighting your mission',
      'Add Manchester, UK as your location',
      'Add company registration number: 17024055'
    ],
    bioTemplate: `HibiscusPlus Limited is a Manchester-based wellness brand crafting premium artisanal hibiscus and beetroot tea blends. Our research-backed recipes combine traditional Nigerian Zobo heritage with modern nutritional science to deliver teas that support heart health, immunity, digestion, and overall wellbeing.

Company No. 17024055 | Registered in England and Wales`,
    contentIdeas: [
      'Company milestones and updates',
      'Industry articles on wellness trends',
      'Health research relevant to hibiscus and beetroot',
      'Partnership and B2B opportunities',
      'Team and founder story'
    ]
  }
];

const emailSetup = {
  domain: 'hibiscusplus.co.uk',
  recommended: [
    { address: 'hello@hibiscusplus.co.uk', purpose: 'General inquiries and customer contact' },
    { address: 'orders@hibiscusplus.co.uk', purpose: 'Order-related communications' },
    { address: 'info@hibiscusplus.co.uk', purpose: 'Business and press inquiries' }
  ],
  providers: [
    { name: 'Google Workspace', cost: 'From £4.60/month', url: 'https://workspace.google.co.uk/', note: 'Best for small businesses. Includes Gmail, Calendar, Drive, Meet.' },
    { name: 'Microsoft 365', cost: 'From £4.90/month', url: 'https://www.microsoft.com/en-gb/microsoft-365/business', note: 'Includes Outlook, Teams, OneDrive. Good if you prefer Microsoft.' },
    { name: 'Zoho Mail', cost: 'Free for up to 5 users', url: 'https://www.zoho.com/mail/', note: 'Budget-friendly option. Free plan includes 5GB per user.' }
  ],
  steps: [
    'Register the domain hibiscusplus.co.uk (if not already done) via Namecheap, GoDaddy, or 123 Reg',
    'Choose an email hosting provider (see recommendations above)',
    'Set up MX records to point your domain to the email provider',
    'Create your business email addresses',
    'Set up email signatures with your brand logo and company details',
    'Test sending and receiving from all addresses'
  ]
};

const SocialMediaGuide = () => {
  const [expandedPlatform, setExpandedPlatform] = useState(null);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50">
      <Toaster position="top-center" />

      <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/5ggfxigz_HibiscuPlus%20Limited%20Dynamic%20Letterform%20Integration%20%281%29.png" alt="HibiscusPlus" className="h-10 w-auto" data-testid="header-logo" />
            </div>
            <Link to="/">
              <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50" data-testid="back-home-btn">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-rose-100 text-rose-700" data-testid="social-media-badge">Social Media & Email Setup</Badge>
          <h2 className="text-4xl font-bold mb-4 text-gray-900" data-testid="social-media-title">
            Set Up Your Online Presence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Step-by-step guides to establish HibiscusPlus Limited across all major social media platforms and set up professional business email.
          </p>
        </div>

        {/* Quick Summary */}
        <Card className="mb-10 border-rose-200 bg-gradient-to-r from-rose-50 to-purple-50" data-testid="handle-summary-card">
          <CardHeader>
            <CardTitle className="text-xl">Recommended Handles Summary</CardTitle>
            <CardDescription>Secure these usernames across all platforms for brand consistency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {platforms.map((p) => (
                <div key={p.name} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="text-gray-700">{p.icon}</div>
                  <div>
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-rose-600 text-sm font-mono">{p.handle}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {p.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Guides */}
        <div className="space-y-6 mb-12">
          <h3 className="text-2xl font-bold text-gray-900">Platform Setup Guides</h3>
          {platforms.map((platform, idx) => (
            <Card
              key={platform.name}
              className="border-gray-200 hover:border-rose-200 transition-all"
              data-testid={`platform-card-${platform.name.toLowerCase()}`}
            >
              <CardHeader
                className="cursor-pointer"
                onClick={() => setExpandedPlatform(expandedPlatform === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white`}>
                      {platform.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{platform.name}</CardTitle>
                      <CardDescription>Username: {platform.handle}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={platform.priority === 'Essential' ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-700'}>
                      {platform.priority}
                    </Badge>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedPlatform === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </CardHeader>

              {expandedPlatform === idx && (
                <CardContent className="space-y-6 border-t border-gray-100 pt-6">
                  {/* Steps */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Setup Steps</h4>
                    <ol className="space-y-2">
                      {platform.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center text-sm font-medium">{i + 1}</span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-3">
                      <a href={platform.url} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-rose-600 hover:bg-rose-700" data-testid={`signup-btn-${platform.name.toLowerCase()}`}>
                          <ExternalLink className="mr-2 h-4 w-4" /> Open {platform.name} Signup
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Bio Template */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Bio / About Template</h4>
                    <div className="relative">
                      <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap border border-gray-200">
                        {platform.bioTemplate}
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 h-8"
                        onClick={() => copyToClipboard(platform.bioTemplate, 'Bio template')}
                        data-testid={`copy-bio-${platform.name.toLowerCase()}`}
                      >
                        <Copy className="h-3 w-3 mr-1" /> Copy
                      </Button>
                    </div>
                  </div>

                  {/* Content Ideas */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Content Ideas</h4>
                    <ul className="space-y-2">
                      {platform.contentIdeas.map((idea, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Email Setup Section */}
        <div className="mb-12" data-testid="email-setup-section">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Email Setup</h3>

          <Card className="border-rose-200 mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>Email Addresses to Create</CardTitle>
                  <CardDescription>Domain: {emailSetup.domain}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {emailSetup.recommended.map((email) => (
                  <div key={email.address} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <p className="font-mono text-rose-600 font-medium">{email.address}</p>
                      <p className="text-sm text-gray-500">{email.purpose}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(email.address, 'Email address')}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Recommended Email Providers</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {emailSetup.providers.map((provider) => (
                    <Card key={provider.name} className="border-gray-200">
                      <CardContent className="pt-4">
                        <h5 className="font-semibold">{provider.name}</h5>
                        <p className="text-rose-600 font-medium text-sm">{provider.cost}</p>
                        <p className="text-sm text-gray-500 mt-1">{provider.note}</p>
                        <a href={provider.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block">
                          <Button size="sm" variant="outline" className="text-xs">
                            <ExternalLink className="h-3 w-3 mr-1" /> Visit
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Setup Steps</h4>
                <ol className="space-y-2">
                  {emailSetup.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center text-sm font-medium">{i + 1}</span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Domain Registration */}
        <Card className="mb-12 border-purple-200 bg-gradient-to-r from-purple-50 to-rose-50" data-testid="domain-card">
          <CardHeader>
            <CardTitle className="text-xl">Domain Registration</CardTitle>
            <CardDescription>Secure your website domain for online presence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="font-mono text-purple-700 font-medium">hibiscusplus.co.uk</p>
                <p className="text-sm text-gray-500">Primary UK domain (recommended)</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="font-mono text-purple-700 font-medium">hibiscusplus.com</p>
                <p className="text-sm text-gray-500">International domain (optional, for future growth)</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Recommended Domain Registrars</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Namecheap — Affordable and user-friendly</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> 123 Reg — UK-based, popular for .co.uk domains</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> GoDaddy — Widely used, bundled email options</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/">
            <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50" data-testid="bottom-back-btn">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 HIBISCUSPLUS LIMITED. All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-1">Company No. 17024055 | Registered in England and Wales</p>
        </div>
      </footer>
    </div>
  );
};

export default SocialMediaGuide;
