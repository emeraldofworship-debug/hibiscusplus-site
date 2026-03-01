import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Leaf, Download, Copy, CheckCircle2, Palette, Type, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';

const BrandAssets = () => {
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const colors = [
    { name: 'Primary Rose', hex: '#DC143C', rgb: 'rgb(220, 20, 60)', usage: 'Primary brand color, CTAs, accents' },
    { name: 'Rose 600', hex: '#E11D48', rgb: 'rgb(225, 29, 72)', usage: 'Hover states, buttons' },
    { name: 'Rose 700', hex: '#BE123C', rgb: 'rgb(190, 18, 60)', usage: 'Active states' },
    { name: 'Purple 600', hex: '#9333EA', rgb: 'rgb(147, 51, 234)', usage: 'Secondary accent, gradients' },
    { name: 'Purple 700', hex: '#7E22CE', rgb: 'rgb(126, 34, 206)', usage: 'Secondary hover states' },
    { name: 'Rose 50', hex: '#FFF1F2', rgb: 'rgb(255, 241, 242)', usage: 'Light backgrounds' },
    { name: 'Rose 100', hex: '#FFE4E6', rgb: 'rgb(255, 228, 230)', usage: 'Cards, badges' },
    { name: 'Purple 50', hex: '#FAF5FF', rgb: 'rgb(250, 245, 255)', usage: 'Alternate backgrounds' },
    { name: 'Gray 900', hex: '#111827', rgb: 'rgb(17, 24, 39)', usage: 'Footer, dark sections' },
    { name: 'White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', usage: 'Main background, text on dark' }
  ];

  const typography = [
    { name: 'Headings', font: 'System Default', weight: 'Bold (700)', size: '2xl - 5xl', usage: 'H1, H2, H3 elements' },
    { name: 'Body Text', font: 'System Default', weight: 'Normal (400)', size: 'base - lg', usage: 'Paragraphs, descriptions' },
    { name: 'Small Text', font: 'System Default', weight: 'Normal (400)', size: 'sm', usage: 'Captions, metadata' },
    { name: 'Buttons', font: 'System Default', weight: 'Medium (500)', size: 'sm - base', usage: 'CTAs, interactive elements' }
  ];

  const logoGuidelines = [
    { rule: 'Minimum Size', value: '32px height', description: 'Never scale logo below this size for legibility' },
    { rule: 'Clear Space', value: 'Equal to icon height', description: 'Maintain clear space around logo on all sides' },
    { rule: 'Color Variations', value: 'Full color, White, Black', description: 'Use appropriate version based on background' },
    { rule: 'Background', value: 'Light or Dark', description: 'Ensure sufficient contrast with background' }
  ];

  const socialMediaSizes = [
    { platform: 'Instagram', profile: '320 x 320px', post: '1080 x 1080px', story: '1080 x 1920px' },
    { platform: 'Facebook', profile: '180 x 180px', cover: '820 x 312px', post: '1200 x 630px' },
    { platform: 'TikTok', profile: '200 x 200px', video: '1080 x 1920px (9:16)', thumbnail: '1080 x 1920px' },
    { platform: 'Pinterest', profile: '165 x 165px', pin: '1000 x 1500px (2:3)', board: '222 x 150px' },
    { platform: 'LinkedIn', profile: '400 x 400px', cover: '1584 x 396px', post: '1200 x 627px' },
    { platform: 'Twitter/X', profile: '400 x 400px', header: '1500 x 500px', post: '1200 x 675px' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/5ggfxigz_HibiscuPlus%20Limited%20Dynamic%20Letterform%20Integration%20%281%29.png" alt="HibiscusPlus" className="h-14 w-auto object-contain" data-testid="header-logo" />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-700 hover:text-rose-600 transition-colors">Home</a>
              <a href="/#recipes" className="text-gray-700 hover:text-rose-600 transition-colors">Recipes</a>
              <a href="/checklist" className="text-gray-700 hover:text-rose-600 transition-colors">Launch Progress</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-200">Brand Guidelines</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Brand Assets & Guidelines
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to maintain consistent branding across all platforms and materials
            </p>
          </div>

          {/* Logo Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <ImageIcon className="h-6 w-6 text-rose-600" />
              <h3 className="text-3xl font-bold text-gray-900">Logo & Identity</h3>
            </div>
            
            <Card className="mb-6 border-rose-200">
              <CardHeader>
                <CardTitle>Official Logos</CardTitle>
                <CardDescription>Two logo versions for different use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Logo 1 - Light Version */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Logo 1 — Tea Blends & Digital</h4>
                  <p className="text-sm text-gray-500 mb-4">Use for: Website, tea packaging, social media profiles, email signatures</p>
                  <div className="bg-white p-8 rounded-lg border border-gray-200 flex items-center justify-center">
                    <img 
                      src="https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/5ggfxigz_HibiscuPlus%20Limited%20Dynamic%20Letterform%20Integration%20%281%29.png" 
                      alt="HibiscusPlus Logo - Light Version" 
                      className="max-h-64 w-auto"
                      data-testid="logo-light"
                    />
                  </div>
                </div>

                {/* Logo 2 - Dark Version */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Logo 2 — Market Stalls & Physical Branding</h4>
                  <p className="text-sm text-gray-500 mb-4">Use for: Market stall banners, signage, physical menus, cups, takeaway branding</p>
                  <div className="bg-gray-900 p-8 rounded-lg flex items-center justify-center">
                    <img 
                      src="https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/hwy1fub7_HibiscuPlus.png" 
                      alt="HibiscusPlus Logo - Dark Version" 
                      className="max-h-64 w-auto"
                      data-testid="logo-dark"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Logo Guidelines */}
            <Card className="border-rose-200">
              <CardHeader>
                <CardTitle>Logo Usage Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {logoGuidelines.map((guideline, index) => (
                    <div key={index} className="p-4 bg-rose-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-rose-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{guideline.rule}</h4>
                          <p className="text-sm text-rose-700 font-medium">{guideline.value}</p>
                          <p className="text-sm text-gray-600 mt-1">{guideline.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Color Palette */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="h-6 w-6 text-rose-600" />
              <h3 className="text-3xl font-bold text-gray-900">Color Palette</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colors.map((color, index) => (
                <Card key={index} className="overflow-hidden border-gray-200 hover:shadow-lg transition-all">
                  <div className="h-32" style={{ backgroundColor: color.hex }}></div>
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-lg mb-2">{color.name}</h4>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">HEX:</span>
                        <button 
                          onClick={() => copyToClipboard(color.hex, 'HEX')}
                          className="flex items-center gap-2 text-sm font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                        >
                          {color.hex}
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">RGB:</span>
                        <button 
                          onClick={() => copyToClipboard(color.rgb, 'RGB')}
                          className="flex items-center gap-2 text-sm font-mono bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                        >
                          {color.rgb}
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{color.usage}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Type className="h-6 w-6 text-rose-600" />
              <h3 className="text-3xl font-bold text-gray-900">Typography</h3>
            </div>
            
            <Card className="border-rose-200">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {typography.map((type, index) => (
                    <div key={index} className="pb-6 border-b border-gray-200 last:border-0">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <h4 className="font-semibold text-lg">{type.name}</h4>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Font:</p>
                          <p className="font-medium">{type.font}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Weight & Size:</p>
                          <p className="font-medium">{type.weight}</p>
                          <p className="text-sm text-gray-500">{type.size}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Usage:</p>
                          <p className="text-sm">{type.usage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media Specifications */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <svg className="h-6 w-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <h3 className="text-3xl font-bold text-gray-900">Social Media Specs</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialMediaSizes.map((platform, index) => (
                <Card key={index} className="border-rose-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {platform.platform}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-rose-50 rounded">
                        <span className="text-sm font-medium">Profile Picture</span>
                        <span className="text-sm font-mono text-rose-700">{platform.profile}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-rose-50 rounded">
                        <span className="text-sm font-medium">{platform.cover ? 'Cover Photo' : platform.video ? 'Video' : 'Post'}</span>
                        <span className="text-sm font-mono text-rose-700">{platform.cover || platform.video || platform.post}</span>
                      </div>
                      {platform.story && (
                        <div className="flex justify-between items-center p-3 bg-rose-50 rounded">
                          <span className="text-sm font-medium">Story</span>
                          <span className="text-sm font-mono text-rose-700">{platform.story}</span>
                        </div>
                      )}
                      {platform.thumbnail && (
                        <div className="flex justify-between items-center p-3 bg-rose-50 rounded">
                          <span className="text-sm font-medium">Thumbnail</span>
                          <span className="text-sm font-mono text-rose-700">{platform.thumbnail}</span>
                        </div>
                      )}
                      {platform.board && (
                        <div className="flex justify-between items-center p-3 bg-rose-50 rounded">
                          <span className="text-sm font-medium">Board Cover</span>
                          <span className="text-sm font-mono text-rose-700">{platform.board}</span>
                        </div>
                      )}
                      {platform.header && (
                        <div className="flex justify-between items-center p-3 bg-rose-50 rounded">
                          <span className="text-sm font-medium">Header</span>
                          <span className="text-sm font-mono text-rose-700">{platform.header}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Brand Voice */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Brand Voice & Messaging</h3>
            
            <Card className="border-rose-200">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-rose-600">We Are</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Natural & Authentic</li>
                      <li>• Warm & Welcoming</li>
                      <li>• Knowledgeable & Trustworthy</li>
                      <li>• Community-Focused</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-rose-600">We're Not</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Corporate or Cold</li>
                      <li>• Overly Medical</li>
                      <li>• Pushy Sales-Focused</li>
                      <li>• Trend-Chasing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-rose-600">Tone</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Friendly & Approachable</li>
                      <li>• Educational</li>
                      <li>• Inspiring</li>
                      <li>• Genuine</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-rose-50 to-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Taglines & Messaging</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="font-medium text-rose-700">Primary: "Natural healing through hibiscus blends and artisanal wellness"</li>
                    <li>• Ancient wisdom meets modern wellness</li>
                    <li>• Explore healing tea recipes and embrace natural health</li>
                    <li>• From our Manchester stalls to your cup</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download Section */}
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl">Need Help?</CardTitle>
              <CardDescription>For logo files, custom graphics, or brand consultation, contact us</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-rose-600 hover:bg-rose-700">
                  <Mail className="mr-2 h-4 w-4" />
                  hello@hibiscusplus.co.uk
                </Button>
                <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50" onClick={() => window.print()}>
                  <Download className="mr-2 h-4 w-4" />
                  Print Guidelines
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

export default BrandAssets;
