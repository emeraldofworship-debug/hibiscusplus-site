import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { CheckCircle2, Circle, AlertCircle, ExternalLink, Mail, Phone, FileText, Building2, Shield, Leaf } from 'lucide-react';
import { Button } from '../components/ui/button';

const LaunchChecklist = () => {
  const [checklist, setChecklist] = useState({
    businessSetup: [
      { 
        id: 1, 
        task: 'Register business name "HibiscusPlus"', 
        completed: false,
        priority: 'high',
        link: 'https://www.gov.uk/register-a-company',
        description: 'Register with Companies House or as a sole trader'
      },
      { 
        id: 2, 
        task: 'Register with Manchester City Council (Food Business)', 
        completed: false,
        priority: 'critical',
        link: 'https://secure.manchester.gov.uk/forms/form/695/food_premises_registration',
        description: 'Must be done at least 28 days before selling. FREE registration.',
        email: 'fsafoodreg@manchester.gov.uk'
      },
      { 
        id: 3, 
        task: 'Set up business bank account', 
        completed: false,
        priority: 'high',
        description: 'Separate personal and business finances'
      },
      { 
        id: 4, 
        task: 'Arrange business insurance', 
        completed: false,
        priority: 'high',
        description: 'Product liability, public liability insurance'
      },
      { 
        id: 5, 
        task: 'Obtain Food Hygiene Rating', 
        completed: false,
        priority: 'critical',
        description: 'Council inspection after registration'
      }
    ],
    partnerships: [
      { 
        id: 6, 
        task: 'Contact Supplement Factory UK', 
        completed: false,
        priority: 'medium',
        phone: '0330 311 2761',
        link: 'https://supplementfactoryuk.com',
        description: 'Get quotes for herbal tea co-packing'
      },
      { 
        id: 7, 
        task: 'Contact Bohea Teas (Manchester)', 
        completed: false,
        priority: 'medium',
        email: 'orders@boheateas.co.uk',
        link: 'https://www.boheateas.co.uk',
        description: 'Local partnership for herbal infusions'
      },
      { 
        id: 8, 
        task: 'Partner with delivery services (Deliveroo/Uber Eats)', 
        completed: false,
        priority: 'medium',
        description: 'Set up accounts for on-demand delivery'
      },
      { 
        id: 9, 
        task: 'Source Nigerian snacks co-packer', 
        completed: false,
        priority: 'low',
        description: 'Future expansion - JDM Food Group or similar'
      }
    ],
    marketing: [
      { 
        id: 10, 
        task: 'Finalize product recipes', 
        completed: false,
        priority: 'high',
        description: 'Perfect your hibiscus tea blends'
      },
      { 
        id: 11, 
        task: 'Professional product photography', 
        completed: false,
        priority: 'medium',
        description: 'High-quality images for website and socials'
      },
      { 
        id: 12, 
        task: 'Set up social media accounts', 
        completed: false,
        priority: 'medium',
        description: 'Instagram, Facebook, TikTok for brand awareness'
      },
      { 
        id: 13, 
        task: 'Book Manchester monthly stall locations', 
        completed: false,
        priority: 'medium',
        description: 'Secure spots at local markets'
      }
    ],
    sourcing: [
      {
        id: 18,
        task: 'Request samples from Cotswold Health',
        completed: false,
        priority: 'high',
        email: 'info@cotswoldhealthproducts.com',
        phone: '01242 570075',
        description: 'Dried hibiscus and organic herbs samples'
      },
      {
        id: 19,
        task: 'Request samples from Baldwin\'s',
        completed: false,
        priority: 'high',
        email: 'sales@baldwins.co.uk',
        phone: '020 7703 5550',
        description: 'Premium herbal blends samples'
      },
      {
        id: 20,
        task: 'Get quote from Teaware UK',
        completed: false,
        priority: 'medium',
        link: 'https://www.teaware.co.uk',
        description: 'Glass infusers and ceramic teapots pricing'
      },
      {
        id: 21,
        task: 'Contact Churchill China for custom tea sets',
        completed: false,
        priority: 'medium',
        phone: '01782 577566',
        description: 'Custom branded ceramic sets with MOQ'
      },
      {
        id: 22,
        task: 'Get packaging quote from Duo UK',
        completed: false,
        priority: 'high',
        email: 'Contact via website',
        phone: '01752 633007',
        description: 'Custom printed pouches and kraft bags'
      },
      {
        id: 23,
        task: 'Test recipes with sourced ingredients',
        completed: false,
        priority: 'critical',
        description: 'Quality control before launch'
      },
      {
        id: 24,
        task: 'Calculate final product pricing',
        completed: false,
        priority: 'high',
        description: 'Cost + markup + shipping consideration'
      },
      {
        id: 25,
        task: 'Explore Nigerian snacks suppliers',
        completed: false,
        priority: 'low',
        description: 'Feco Foods or JDM Food Group for future expansion'
      }
    ],
    website: [
      { 
        id: 14, 
        task: 'Website design and development', 
        completed: true,
        priority: 'critical',
        description: 'Professional website with recipes, shop, blog'
      },
      { 
        id: 15, 
        task: 'Set up payment gateway', 
        completed: false,
        priority: 'high',
        description: 'Stripe or PayPal integration for online sales'
      },
      { 
        id: 16, 
        task: 'Test website functionality', 
        completed: false,
        priority: 'high',
        description: 'Full testing before launch'
      },
      { 
        id: 17, 
        task: 'Domain name and hosting', 
        completed: false,
        priority: 'critical',
        description: 'Register hibiscusplus.co.uk'
      }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem('launchChecklist');
    if (saved) {
      setChecklist(JSON.parse(saved));
    }
  }, []);

  const toggleTask = (category, taskId) => {
    const updated = { ...checklist };
    const task = updated[category].find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setChecklist(updated);
      localStorage.setItem('launchChecklist', JSON.stringify(updated));
    }
  };

  const calculateProgress = () => {
    const allTasks = Object.values(checklist).flat();
    const completedTasks = allTasks.filter(t => t.completed).length;
    return Math.round((completedTasks / allTasks.length) * 100);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/5ggfxigz_HibiscuPlus%20Limited%20Dynamic%20Letterform%20Integration%20%281%29.png" alt="HibiscusPlus" className="h-16 w-auto object-contain" data-testid="header-logo" />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-700 hover:text-rose-600 transition-colors">Home</a>
              <a href="/#recipes" className="text-gray-700 hover:text-rose-600 transition-colors">Recipes</a>
              <a href="/#blog" className="text-gray-700 hover:text-rose-600 transition-colors">Blog</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-200">Pre-Launch Phase</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Launch Checklist
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Track your progress as we prepare to launch HibiscusPlus. We're building something special!
            </p>
            
            {/* Progress Bar */}
            <Card className="max-w-md mx-auto border-rose-200">
              <CardHeader>
                <CardTitle className="text-2xl">{progress}% Complete</CardTitle>
                <CardDescription>You're on your way to launch!</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-3" />
              </CardContent>
            </Card>
          </div>

          {/* Business Setup Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-rose-600" />
              Business Setup & Registration
            </h3>
            <div className="space-y-4">
              {checklist.businessSetup.map(task => (
                <Card key={task.id} className={`border-l-4 ${task.completed ? 'border-l-green-500' : 'border-l-rose-500'} hover:shadow-lg transition-all`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <button 
                          onClick={() => toggleTask('businessSetup', task.id)}
                          className="mt-1"
                        >
                          {task.completed ? 
                            <CheckCircle2 className="h-6 w-6 text-green-600" /> : 
                            <Circle className="h-6 w-6 text-gray-400" />
                          }
                        </button>
                        <div className="flex-1">
                          <CardTitle className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.task}
                          </CardTitle>
                          <CardDescription className="mt-2">{task.description}</CardDescription>
                          
                          {/* Contact Info */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            {task.link && (
                              <a href={task.link} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                                  <ExternalLink className="mr-2 h-3 w-3" />
                                  Visit Website
                                </Button>
                              </a>
                            )}
                            {task.email && (
                              <a href={`mailto:${task.email}`}>
                                <Button size="sm" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                                  <Mail className="mr-2 h-3 w-3" />
                                  {task.email}
                                </Button>
                              </a>
                            )}
                            {task.phone && (
                              <a href={`tel:${task.phone}`}>
                                <Button size="sm" variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                                  <Phone className="mr-2 h-3 w-3" />
                                  {task.phone}
                                </Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Partnerships Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-rose-600" />
              Production & Delivery Partnerships
            </h3>
            <div className="space-y-4">
              {checklist.partnerships.map(task => (
                <Card key={task.id} className={`border-l-4 ${task.completed ? 'border-l-green-500' : 'border-l-purple-500'} hover:shadow-lg transition-all`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <button 
                          onClick={() => toggleTask('partnerships', task.id)}
                          className="mt-1"
                        >
                          {task.completed ? 
                            <CheckCircle2 className="h-6 w-6 text-green-600" /> : 
                            <Circle className="h-6 w-6 text-gray-400" />
                          }
                        </button>
                        <div className="flex-1">
                          <CardTitle className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.task}
                          </CardTitle>
                          <CardDescription className="mt-2">{task.description}</CardDescription>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            {task.link && (
                              <a href={task.link} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                                  <ExternalLink className="mr-2 h-3 w-3" />
                                  Visit Website
                                </Button>
                              </a>
                            )}
                            {task.email && (
                              <a href={`mailto:${task.email}`}>
                                <Button size="sm" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                                  <Mail className="mr-2 h-3 w-3" />
                                  {task.email}
                                </Button>
                              </a>
                            )}
                            {task.phone && (
                              <a href={`tel:${task.phone}`}>
                                <Button size="sm" variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                                  <Phone className="mr-2 h-3 w-3" />
                                  {task.phone}
                                </Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Marketing Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-rose-600" />
              Marketing & Branding
            </h3>
            <div className="space-y-4">
              {checklist.marketing.map(task => (
                <Card key={task.id} className={`border-l-4 ${task.completed ? 'border-l-green-500' : 'border-l-blue-500'} hover:shadow-lg transition-all`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <button 
                          onClick={() => toggleTask('marketing', task.id)}
                          className="mt-1"
                        >
                          {task.completed ? 
                            <CheckCircle2 className="h-6 w-6 text-green-600" /> : 
                            <Circle className="h-6 w-6 text-gray-400" />
                          }
                        </button>
                        <div className="flex-1">
                          <CardTitle className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.task}
                          </CardTitle>
                          <CardDescription className="mt-2">{task.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Product Sourcing Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <svg className="h-6 w-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Product Sourcing
              </h3>
              <a href="/suppliers" target="_blank">
                <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                  View Full Supplier Directory
                </Button>
              </a>
            </div>
            <div className="space-y-4">
              {checklist.sourcing.map(task => (
                <Card key={task.id} className={`border-l-4 ${task.completed ? 'border-l-green-500' : 'border-l-orange-500'} hover:shadow-lg transition-all`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <button 
                          onClick={() => toggleTask('sourcing', task.id)}
                          className="mt-1"
                        >
                          {task.completed ? 
                            <CheckCircle2 className="h-6 w-6 text-green-600" /> : 
                            <Circle className="h-6 w-6 text-gray-400" />
                          }
                        </button>
                        <div className="flex-1">
                          <CardTitle className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.task}
                          </CardTitle>
                          <CardDescription className="mt-2">{task.description}</CardDescription>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            {task.link && (
                              <a href={task.link} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                                  <ExternalLink className="mr-2 h-3 w-3" />
                                  Visit Website
                                </Button>
                              </a>
                            )}
                            {task.email && (
                              <a href={`mailto:${task.email}`}>
                                <Button size="sm" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                                  <Mail className="mr-2 h-3 w-3" />
                                  {task.email}
                                </Button>
                              </a>
                            )}
                            {task.phone && (
                              <a href={`tel:${task.phone}`}>
                                <Button size="sm" variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
                                  <Phone className="mr-2 h-3 w-3" />
                                  {task.phone}
                                </Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Website Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Leaf className="h-6 w-6 text-rose-600" />
              Website & Technology
            </h3>
            <div className="space-y-4">
              {checklist.website.map(task => (
                <Card key={task.id} className={`border-l-4 ${task.completed ? 'border-l-green-500' : 'border-l-orange-500'} hover:shadow-lg transition-all`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <button 
                          onClick={() => toggleTask('website', task.id)}
                          className="mt-1"
                        >
                          {task.completed ? 
                            <CheckCircle2 className="h-6 w-6 text-green-600" /> : 
                            <Circle className="h-6 w-6 text-gray-400" />
                          }
                        </button>
                        <div className="flex-1">
                          <CardTitle className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.task}
                          </CardTitle>
                          <CardDescription className="mt-2">{task.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Note */}
          <Card className="border-rose-200 bg-rose-50">
            <CardHeader>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-rose-600 mt-1" />
                <div>
                  <CardTitle className="text-rose-900">Important Reminder</CardTitle>
                  <CardDescription className="text-rose-700 mt-2">
                    You must register with Manchester City Council at least 28 days before selling any food products. 
                    The website can collect newsletter signups and display information, but the shop functionality 
                    should remain in "Coming Soon" mode until registration is complete.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
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
          <p className="text-gray-400">Pre-Launch Phase - Building Something Special</p>
          <p className="text-gray-500 text-sm mt-4">&copy; 2025 HibiscusPlus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LaunchChecklist;