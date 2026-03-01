import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { CheckCircle2, Circle, AlertCircle, ExternalLink, Leaf } from 'lucide-react';

const PreLaunchChecklist = () => {
  const [checklist, setChecklist] = useState({
    brandingAndLegal: [
      { id: 1, task: 'Decide on final business name', completed: false, priority: 'critical', note: 'HibiscusPlus vs HibiscusPlus' },
      { id: 2, task: 'Register domain name (hibiscusplus.co.uk)', completed: false, priority: 'critical', link: 'https://www.namecheap.com' },
      { id: 3, task: 'Create logo on Canva', completed: false, priority: 'high', link: 'https://www.canva.com/create/logos/' },
      { id: 4, task: 'Register company with Companies House (if Ltd)', completed: false, priority: 'high', link: 'https://www.gov.uk/register-a-company' },
      { id: 5, task: 'Register as sole trader (if not Ltd)', completed: false, priority: 'high', link: 'https://www.gov.uk/set-up-sole-trader' },
      { id: 6, task: 'Register with Manchester City Council (Food Business)', completed: false, priority: 'critical', note: '28 days before selling', link: 'https://secure.manchester.gov.uk/forms/form/695/food_premises_registration' },
      { id: 7, task: 'Set up business bank account', completed: false, priority: 'high', note: 'Starling, Tide, or traditional banks' },
      { id: 8, task: 'Get business insurance (liability)', completed: false, priority: 'high', note: 'Product liability essential' }
    ],
    websiteAndTech: [
      { id: 9, task: 'Update all branding to HibiscusPlus (if chosen)', completed: false, priority: 'high', note: 'Website, social media, etc.' },
      { id: 10, task: 'Upload final logo to website', completed: false, priority: 'medium' },
      { id: 11, task: 'Test website on mobile devices', completed: false, priority: 'high' },
      { id: 12, task: 'Test all recipes display correctly', completed: false, priority: 'high' },
      { id: 13, task: 'Test newsletter signup', completed: false, priority: 'medium' },
      { id: 14, task: 'Test search functionality', completed: false, priority: 'medium' },
      { id: 15, task: 'Deploy website to Emergent', completed: false, priority: 'critical' },
      { id: 16, task: 'Connect custom domain', completed: false, priority: 'critical' },
      { id: 17, task: 'Set up business email (hello@hibiscusplus.co.uk)', completed: false, priority: 'high', link: 'https://www.hostinger.co.uk' },
      { id: 18, task: 'Test live website after deployment', completed: false, priority: 'critical' }
    ],
    socialMediaAndMarketing: [
      { id: 19, task: 'Create Instagram account (@hibiscusplus)', completed: false, priority: 'high', link: 'https://www.instagram.com/accounts/emailsignup/' },
      { id: 20, task: 'Create Facebook business page', completed: false, priority: 'high', link: 'https://www.facebook.com/pages/creation/' },
      { id: 21, task: 'Create TikTok account', completed: false, priority: 'medium', link: 'https://www.tiktok.com/signup' },
      { id: 22, task: 'Create Pinterest account', completed: false, priority: 'medium', link: 'https://www.pinterest.co.uk/business/create/' },
      { id: 23, task: 'Create LinkedIn company page', completed: false, priority: 'low', link: 'https://www.linkedin.com/company/setup/new/' },
      { id: 24, task: 'Design social media graphics', completed: false, priority: 'medium', note: 'Use Canva templates' },
      { id: 25, task: 'Prepare 10 posts for launch week', completed: false, priority: 'high' },
      { id: 26, task: 'Join Manchester business groups', completed: false, priority: 'medium' }
    ],
    productsAndSuppliers: [
      { id: 27, task: 'Request samples from Cotswold Health', completed: false, priority: 'high', note: 'Dried hibiscus' },
      { id: 28, task: 'Request samples from Baldwin\'s', completed: false, priority: 'high', note: 'Herbal blends' },
      { id: 29, task: 'Contact Supplement Factory UK (dropshipping)', completed: false, priority: 'high', note: 'Phone: 0330 311 2761' },
      { id: 30, task: 'Contact UK Loose Leaf Tea Co. (dropshipping)', completed: false, priority: 'high' },
      { id: 31, task: 'Get packaging quotes from Duo UK', completed: false, priority: 'medium', note: 'Tea bags, pouches' },
      { id: 32, task: 'Finalize 6 core tea recipes', completed: false, priority: 'critical', note: 'Test and perfect' },
      { id: 33, task: 'Source Nigerian snacks suppliers', completed: false, priority: 'low', note: 'For future expansion' },
      { id: 34, task: 'Calculate product pricing', completed: false, priority: 'high', note: 'Cost + profit margin' },
      { id: 35, task: 'Create product labels (allergen info)', completed: false, priority: 'high' }
    ],
    manchesterStalls: [
      { id: 36, task: 'Research Manchester monthly markets', completed: false, priority: 'high', note: 'Altrincham, Northern Quarter' },
      { id: 37, task: 'Apply for market stall permits', completed: false, priority: 'high' },
      { id: 38, task: 'Purchase stall equipment (table, canopy)', completed: false, priority: 'medium' },
      { id: 39, task: 'Design stall signage', completed: false, priority: 'medium' },
      { id: 40, task: 'Prepare sampling strategy', completed: false, priority: 'medium', note: 'Free samples to attract' },
      { id: 41, task: 'Get portable card reader (Square/SumUp)', completed: false, priority: 'high' },
      { id: 42, task: 'Plan first 3 market dates', completed: false, priority: 'medium' }
    ],
    finalPreparations: [
      { id: 43, task: 'Prepare launch announcement', completed: false, priority: 'high' },
      { id: 44, task: 'Set up payment gateway (Stripe)', completed: false, priority: 'critical', note: 'After registration' },
      { id: 45, task: 'Print business cards', completed: false, priority: 'medium' },
      { id: 46, task: 'Create email signature', completed: false, priority: 'low' },
      { id: 47, task: 'Prepare FAQ document', completed: false, priority: 'low' },
      { id: 48, task: 'Plan launch promotions', completed: false, priority: 'high', note: 'Discounts, bundles' },
      { id: 49, task: 'Obtain Food Hygiene Rating', completed: false, priority: 'critical', note: 'After council inspection' },
      { id: 50, task: 'GO LIVE! 🚀', completed: false, priority: 'critical', note: 'Launch day!' }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem('preLaunchChecklist');
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
      localStorage.setItem('preLaunchChecklist', JSON.stringify(updated));
    }
  };

  const calculateProgress = () => {
    const allTasks = Object.values(checklist).flat();
    const completedTasks = allTasks.filter(t => t.completed).length;
    return Math.round((completedTasks / allTasks.length) * 100);
  };

  const getCategoryProgress = (category) => {
    const tasks = checklist[category];
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
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

  const categoryInfo = {
    brandingAndLegal: { title: 'Branding & Legal', icon: '⚖️', color: 'rose' },
    websiteAndTech: { title: 'Website & Technology', icon: '💻', color: 'purple' },
    socialMediaAndMarketing: { title: 'Social Media & Marketing', icon: '📱', color: 'blue' },
    productsAndSuppliers: { title: 'Products & Suppliers', icon: '📦', color: 'green' },
    manchesterStalls: { title: 'Manchester Market Stalls', icon: '🏪', color: 'orange' },
    finalPreparations: { title: 'Final Preparations', icon: '🚀', color: 'pink' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/5ggfxigz_HibiscuPlus%20Limited%20Dynamic%20Letterform%20Integration%20%281%29.png" alt="HibiscusPlus" className="h-10 w-auto" data-testid="header-logo" />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-700 hover:text-rose-600 transition-colors">Home</a>
              <a href="/checklist" className="text-gray-700 hover:text-rose-600 transition-colors">Launch Checklist</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-200">Pre-Launch</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Complete Pre-Launch Checklist
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              50 essential tasks to complete before launching HibiscusPlus. Track your progress to a successful launch!
            </p>
            
            {/* Overall Progress */}
            <Card className="max-w-md mx-auto border-rose-200">
              <CardHeader>
                <CardTitle className="text-3xl">{progress}% Complete</CardTitle>
                <CardDescription>You're getting closer to launch day!</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-4" />
                <p className="text-sm text-gray-600 mt-4">
                  {Object.values(checklist).flat().filter(t => t.completed).length} of 50 tasks completed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Categories */}
          {Object.entries(categoryInfo).map(([key, info]) => {
            const categoryProgress = getCategoryProgress(key);
            return (
              <div key={key} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <span>{info.icon}</span>
                    {info.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{categoryProgress}%</span>
                    <div className="w-32">
                      <Progress value={categoryProgress} className="h-2" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {checklist[key].map(task => (
                    <Card key={task.id} className={`border-l-4 ${task.completed ? 'border-l-green-500 bg-green-50/30' : `border-l-${info.color}-500`} hover:shadow-lg transition-all`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <button 
                              onClick={() => toggleTask(key, task.id)}
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
                              {task.note && (
                                <p className="text-sm text-gray-600 mt-1">{task.note}</p>
                              )}
                              {task.link && (
                                <a href={task.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-rose-600 hover:text-rose-700 mt-2">
                                  <ExternalLink className="h-3 w-3" />
                                  Quick Link
                                </a>
                              )}
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
            );
          })}

          {/* Important Notes */}
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-purple-50 mt-12">
            <CardHeader>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-rose-600 mt-1" />
                <div>
                  <CardTitle className="text-rose-900">Critical Timeline Notes</CardTitle>
                  <CardDescription className="text-rose-700 mt-2 space-y-2">
                    <p><strong>28 Days Before Selling:</strong> Register with Manchester City Council (Food Business)</p>
                    <p><strong>2-3 Weeks Before Launch:</strong> Finalize suppliers, test products, create social media content</p>
                    <p><strong>1 Week Before Launch:</strong> Deploy website, connect domain, final testing</p>
                    <p><strong>Launch Day:</strong> Go live, announce on social media, celebrate! 🎉</p>
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
          <p className="text-gray-400">Pre-Launch Phase - Building Something Amazing</p>
          <p className="text-gray-500 text-sm mt-4">&copy; 2025 HibiscusPlus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PreLaunchChecklist;
