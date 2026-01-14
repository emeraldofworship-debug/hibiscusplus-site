import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Leaf, Mail, Phone, ExternalLink, MapPin, Copy, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';

const Suppliers = () => {
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const suppliers = {
    herbs: [
      {
        name: 'Cotswold Health Products',
        category: 'Dried Hibiscus & Herbs',
        description: 'Bulk dried hibiscus and organic certified herbs. UK-based with competitive pricing.',
        phone: '01242 570075',
        email: 'info@cotswoldhealthproducts.com',
        website: 'https://www.cotswoldhealthproducts.com',
        location: 'Gloucestershire, UK',
        specialties: ['Dried Hibiscus', 'Organic Herbs', 'Bulk Orders', 'Quick Delivery']
      },
      {
        name: 'G Baldwin & Co',
        category: 'Premium Herbalist',
        description: 'Established 1844. Trusted herbalist with wide range of dried herbs and wholesale accounts.',
        phone: '020 7703 5550',
        email: 'sales@baldwins.co.uk',
        website: 'https://www.baldwins.co.uk',
        location: 'London, UK',
        specialties: ['Premium Quality', 'Wide Range', 'Wholesale Accounts', 'Expert Advice']
      },
      {
        name: 'Supplement Factory UK',
        category: 'Co-Packer / Contract Manufacturing',
        description: 'Private label herbal teas and custom wellness tea blends production.',
        phone: '0330 311 2761',
        website: 'https://supplementfactoryuk.com',
        location: 'Ashford, Kent',
        specialties: ['Contract Manufacturing', 'Private Label', 'Custom Blends', 'Quality Control']
      },
      {
        name: 'Bohea Teas',
        category: 'Local Manchester Partner',
        description: 'Manchester-based tea wholesaler. Perfect for local partnership and herbal infusions.',
        email: 'orders@boheateas.co.uk',
        website: 'https://www.boheateas.co.uk',
        location: 'Manchester, UK',
        specialties: ['Local Partnership', 'Herbal Infusions', 'Quick Turnaround', 'Wholesale']
      }
    ],
    accessories: [
      {
        name: 'Teaware UK',
        category: 'Tea Accessories',
        description: 'Glass infusers, ceramic teapots, and bulk wholesale pricing for tea accessories.',
        website: 'https://www.teaware.co.uk',
        location: 'UK',
        specialties: ['Glass Infusers', 'Ceramic Teapots', 'Wholesale Pricing', 'Wide Selection']
      },
      {
        name: 'Churchill China',
        category: 'Ceramic Manufacturer',
        description: 'UK manufacturer of ceramic tea sets with customizable branding options.',
        phone: '01782 577566',
        website: 'https://www.churchill1795.com',
        location: 'Staffordshire, UK',
        specialties: ['UK Made', 'Custom Branding', 'Tea Sets', 'Trade Accounts']
      },
      {
        name: 'Price & Kensington',
        category: 'UK Pottery',
        description: 'Quality teapots and cups with trade accounts available.',
        website: 'https://www.price-kensington.com',
        location: 'Stoke-on-Trent, UK',
        specialties: ['Traditional Pottery', 'Teapots', 'Trade Pricing', 'Established Brand']
      }
    ],
    packaging: [
      {
        name: 'Duo UK',
        category: 'Packaging Supplies',
        description: 'Food-safe pouches, custom printing, kraft paper bags with windows for tea blends.',
        phone: '01752 633007',
        website: 'https://www.duo-uk.co.uk',
        location: 'Plymouth, UK',
        specialties: ['Custom Printing', 'Food-Safe Pouches', 'Kraft Bags', 'Labels & Stickers']
      },
      {
        name: 'Packaging2Buy',
        category: 'Packaging Solutions',
        description: 'Tea bags, sachets, labels and stickers. UK-based packaging supplier.',
        website: 'https://www.packaging2buy.co.uk',
        location: 'UK',
        specialties: ['Tea Bags', 'Sachets', 'Labels', 'Quick Delivery']
      }
    ],
    nigerian: [
      {
        name: 'Feco Foods Industries Ltd',
        category: 'Nigerian Products Import',
        description: 'Premium African food products export to UK. Handles export documentation.',
        website: 'https://fecofoods.com.ng',
        location: 'Nigeria (Ships to UK)',
        specialties: ['African Foods', 'Export Ready', 'Quality Products', 'Documentation Support']
      },
      {
        name: 'JDM Food Group Ltd',
        category: 'Co-Packer for Nigerian Snacks',
        description: 'UK food contract manufacturer. Contact for Nigerian snack co-packing capacity.',
        location: 'Lincolnshire, England',
        specialties: ['Contract Manufacturing', 'Food Production', '50-249 Employees', 'UK Based']
      }
    ]
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
              <a href="/checklist" className="text-gray-700 hover:text-rose-600 transition-colors">Launch Progress</a>
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
            <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-200">Supplier Directory</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Trusted Suppliers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verified UK suppliers for herbs, packaging, accessories, and Nigerian products
            </p>
          </div>

          {/* Herbs & Hibiscus Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Leaf className="h-6 w-6 text-rose-600" />
              Herbs & Hibiscus Suppliers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suppliers.herbs.map((supplier, index) => (
                <Card key={index} className="border-rose-200 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="text-xl">{supplier.name}</CardTitle>
                        <Badge className="mt-2 bg-purple-100 text-purple-700">{supplier.category}</Badge>
                      </div>
                      {supplier.website && (
                        <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost" className="text-rose-600">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                    <CardDescription className="text-base">{supplier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {supplier.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-rose-600" />
                          <button 
                            onClick={() => copyToClipboard(supplier.phone, 'Phone')}
                            className="text-sm hover:text-rose-600 transition-colors flex items-center gap-2"
                          >
                            {supplier.phone}
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      {supplier.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-rose-600" />
                          <button 
                            onClick={() => copyToClipboard(supplier.email, 'Email')}
                            className="text-sm hover:text-rose-600 transition-colors flex items-center gap-2"
                          >
                            {supplier.email}
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      {supplier.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-rose-600" />
                          <span className="text-sm text-gray-600">{supplier.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {supplier.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{specialty}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tea Accessories Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6">Tea Accessories & Pottery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suppliers.accessories.map((supplier, index) => (
                <Card key={index} className="border-rose-200 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="text-xl">{supplier.name}</CardTitle>
                        <Badge className="mt-2 bg-blue-100 text-blue-700">{supplier.category}</Badge>
                      </div>
                      {supplier.website && (
                        <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost" className="text-rose-600">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                    <CardDescription className="text-base">{supplier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {supplier.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-rose-600" />
                          <button 
                            onClick={() => copyToClipboard(supplier.phone, 'Phone')}
                            className="text-sm hover:text-rose-600 transition-colors flex items-center gap-2"
                          >
                            {supplier.phone}
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      {supplier.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-rose-600" />
                          <span className="text-sm text-gray-600">{supplier.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {supplier.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{specialty}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Packaging Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6">Packaging Suppliers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suppliers.packaging.map((supplier, index) => (
                <Card key={index} className="border-rose-200 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="text-xl">{supplier.name}</CardTitle>
                        <Badge className="mt-2 bg-green-100 text-green-700">{supplier.category}</Badge>
                      </div>
                      {supplier.website && (
                        <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost" className="text-rose-600">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                    <CardDescription className="text-base">{supplier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {supplier.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-rose-600" />
                          <button 
                            onClick={() => copyToClipboard(supplier.phone, 'Phone')}
                            className="text-sm hover:text-rose-600 transition-colors flex items-center gap-2"
                          >
                            {supplier.phone}
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      {supplier.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-rose-600" />
                          <span className="text-sm text-gray-600">{supplier.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {supplier.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{specialty}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Nigerian Products Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6">Nigerian Products Suppliers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suppliers.nigerian.map((supplier, index) => (
                <Card key={index} className="border-rose-200 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="text-xl">{supplier.name}</CardTitle>
                        <Badge className="mt-2 bg-orange-100 text-orange-700">{supplier.category}</Badge>
                      </div>
                      {supplier.website && (
                        <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost" className="text-rose-600">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                    <CardDescription className="text-base">{supplier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {supplier.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-rose-600" />
                          <span className="text-sm text-gray-600">{supplier.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {supplier.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{specialty}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-rose-600" />
                Sourcing Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2 text-rose-700">Before Contacting:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Know your quantities (start with samples)</li>
                    <li>• Prepare your business details</li>
                    <li>• Have your budget range ready</li>
                    <li>• Ask about lead times</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-rose-700">Smart Strategy:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Start with 2-3 suppliers (compare prices)</li>
                    <li>• Request samples before bulk orders</li>
                    <li>• Negotiate payment terms</li>
                    <li>• Build long-term relationships</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center">
                <a href="/email-templates">
                  <Button className="bg-rose-600 hover:bg-rose-700">
                    <Mail className="mr-2 h-4 w-4" />
                    View Email Templates for Suppliers
                  </Button>
                </a>
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

export default Suppliers;