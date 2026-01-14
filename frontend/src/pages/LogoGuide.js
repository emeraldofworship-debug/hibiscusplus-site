import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Leaf, ExternalLink, Download, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';

const LogoGuide = () => {
  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        toast.success('Logo preview loaded! Save this file for your website.');
      };
      reader.readAsDataURL(file);
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
              <Leaf className="h-8 w-8 text-rose-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                Hibiscus & Beyond
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-700 hover:text-rose-600 transition-colors">Home</a>
              <a href="/brand-assets" className="text-gray-700 hover:text-rose-600 transition-colors">Brand Assets</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-200">Design Guide</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Logo & Font Guide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create a professional logo and customize your website fonts in minutes
            </p>
          </div>

          {/* Current Logo & Fonts */}
          <Card className="mb-12 border-rose-200">
            <CardHeader>
              <CardTitle className="text-2xl">✅ Your Current Design</CardTitle>
              <CardDescription>Already applied to your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-rose-700">Current Logo (Placeholder):</h3>
                  <div className="p-6 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                    <div className="flex items-center gap-3">
                      <Leaf className="h-12 w-12 text-rose-600" />
                      <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                        Hibiscus & Beyond
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Replace with your custom logo below</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-rose-700">Current Fonts (✓ Applied):</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-rose-50 rounded-lg">
                      <p className="font-semibold text-rose-900 mb-1" style={{fontFamily: 'Playfair Display, serif'}}>
                        Playfair Display
                      </p>
                      <p className="text-sm text-gray-600">Used for all headings - Elegant serif</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="font-semibold text-purple-900 mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>
                        Poppins
                      </p>
                      <p className="text-sm text-gray-600">Used for body text - Modern, friendly</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logo Creation Options */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6">🎨 Create Your Logo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Canva */}
              <Card className="border-rose-200 hover:shadow-xl transition-all">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-green-100 text-green-700">⭐ Recommended</Badge>
                  <CardTitle>Canva (FREE)</CardTitle>
                  <CardDescription>Easiest for beginners</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Thousands of templates, drag-and-drop, free hibiscus graphics
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-rose-700">Quick Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-600">
                        <li>Go to Canva.com</li>
                        <li>Search "flower logo"</li>
                        <li>Customize with your colors</li>
                        <li>Download as PNG (transparent)</li>
                      </ol>
                    </div>
                    <a href="https://www.canva.com/create/logos/" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-rose-600 hover:bg-rose-700">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Start on Canva
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Looka */}
              <Card className="border-rose-200 hover:shadow-xl transition-all">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-blue-100 text-blue-700">AI-Powered</Badge>
                  <CardTitle>Looka (£20)</CardTitle>
                  <CardDescription>AI generates options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      AI creates multiple logo variations based on your preferences
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-rose-700">Quick Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-600">
                        <li>Visit Looka.com</li>
                        <li>Enter "Hibiscus & Beyond"</li>
                        <li>Choose wellness/health industry</li>
                        <li>Pick your favorite design</li>
                      </ol>
                    </div>
                    <a href="https://looka.com" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-rose-600 hover:bg-rose-700">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Try Looka
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Hatchful */}
              <Card className="border-rose-200 hover:shadow-xl transition-all">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-purple-100 text-purple-700">100% FREE</Badge>
                  <CardTitle>Hatchful</CardTitle>
                  <CardDescription>By Shopify, instant</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Quick logo maker, download instantly, no account needed
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-rose-700">Quick Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-600">
                        <li>Open Hatchful.shopify.com</li>
                        <li>Select "Health & Wellness"</li>
                        <li>Customize colors (rose/purple)</li>
                        <li>Download free</li>
                      </ol>
                    </div>
                    <a href="https://hatchful.shopify.com" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-rose-600 hover:bg-rose-700">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Use Hatchful
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Logo Upload Preview */}
          <Card className="mb-12 border-rose-200">
            <CardHeader>
              <CardTitle className="text-2xl">📤 Preview Your Logo</CardTitle>
              <CardDescription>Upload your logo file to see how it looks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-rose-300 border-dashed rounded-lg cursor-pointer bg-rose-50 hover:bg-rose-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo preview" className="max-h-48 max-w-full" />
                      ) : (
                        <>
                          <Upload className="w-12 h-12 mb-4 text-rose-600" />
                          <p className="mb-2 text-sm text-gray-700">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG or SVG (Transparent PNG recommended)</p>
                        </>
                      )}
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                </div>

                {logoPreview && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-800">Logo Preview Loaded!</p>
                        <p className="text-sm text-green-700 mt-1">
                          To use this logo on your website, save the file and contact me. I'll help you implement it.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Logo Specifications */}
          <Card className="mb-12 border-rose-200">
            <CardHeader>
              <CardTitle className="text-2xl">📐 Logo Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-rose-700">Recommended Sizes:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-rose-50 rounded">
                      <span>Website Header:</span>
                      <span className="font-mono">500 x 200px</span>
                    </div>
                    <div className="flex justify-between p-2 bg-rose-50 rounded">
                      <span>Social Media:</span>
                      <span className="font-mono">1000 x 1000px</span>
                    </div>
                    <div className="flex justify-between p-2 bg-rose-50 rounded">
                      <span>Favicon (tab icon):</span>
                      <span className="font-mono">512 x 512px</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-rose-700">File Format Tips:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">PNG with transparency</span>
                      </div>
                      <p className="text-gray-600">Best for website use</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold">SVG format</span>
                      </div>
                      <p className="text-gray-600">Scales perfectly, smaller file</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span className="font-semibold">Avoid JPG</span>
                      </div>
                      <p className="text-gray-600">No transparency support</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Font Alternatives */}
          <Card className="mb-12 border-rose-200">
            <CardHeader>
              <CardTitle className="text-2xl">🔤 Alternative Font Combinations</CardTitle>
              <CardDescription>Want to try different fonts? Here are some alternatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-rose-700">Current (✓ Applied)</h4>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <p className="text-lg mb-1" style={{fontFamily: 'Playfair Display, serif'}}>Playfair Display (Headings)</p>
                  <p style={{fontFamily: 'Poppins, sans-serif'}}>Poppins (Body) - Modern & Professional</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:border-rose-300 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-rose-700 mb-2">Option 2: Natural & Elegant</h4>
                  <p className="text-lg mb-1" style={{fontFamily: 'serif'}}>Cormorant Garamond (Headings)</p>
                  <p style={{fontFamily: 'sans-serif'}}>Nunito (Body) - Soft & Approachable</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:border-rose-300 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-rose-700 mb-2">Option 3: Bold & Modern</h4>
                  <p className="text-lg mb-1" style={{fontFamily: 'sans-serif', fontWeight: 700}}>Montserrat (Headings)</p>
                  <p style={{fontFamily: 'sans-serif'}}>Lato (Body) - Clean & Contemporary</p>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                  💡 Want to change fonts? Let me know which option you prefer and I'll update your website!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Need Help Card */}
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  I can help you implement your logo or change fonts! Just send me:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                    <span>Your logo file (PNG or SVG)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                    <span>Preferred font combination (or I'll help you choose)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                    <span>Any specific color adjustments</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600">
                  Response time: Usually within minutes!
                </p>
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
            <h3 className="text-xl font-bold">Hibiscus & Beyond</h3>
          </div>
          <p className="text-gray-400">Natural healing through hibiscus blends and artisanal wellness</p>
          <p className="text-gray-500 text-sm mt-4">&copy; 2025 Hibiscus & Beyond. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LogoGuide;
