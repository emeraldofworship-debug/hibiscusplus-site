import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Leaf, CheckCircle2, Circle, ExternalLink, Mail, Instagram, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '../components/ui/sonner';

const CompanySetupGuide = () => {
  const [checklist, setChecklist] = useState({
    domainAndEmail: [
      { id: 1, task: 'Register domain: hibiscusplus.co.uk', completed: false, link: 'https://www.namecheap.com' },
      { id: 2, task: 'Set up business email hosting', completed: false, link: 'https://www.hostinger.co.uk' },
      { id: 3, task: 'Create hello@hibiscusplus.co.uk', completed: false },
      { id: 4, task: 'Create orders@hibiscusplus.co.uk', completed: false },
      { id: 5, task: 'Create info@hibiscusplus.co.uk', completed: false },
      { id: 6, task: 'Set up email signatures', completed: false }
    ],
    socialMedia: [
      { id: 7, task: 'Create Instagram @hibiscusplus', completed: false, link: 'https://www.instagram.com/accounts/emailsignup/' },
      { id: 8, task: 'Create Facebook Page', completed: false, link: 'https://www.facebook.com/pages/creation/' },
      { id: 9, task: 'Create TikTok @hibiscusplus', completed: false, link: 'https://www.tiktok.com/signup' },
      { id: 10, task: 'Create Pinterest Business', completed: false, link: 'https://www.pinterest.co.uk/business/create/' },
      { id: 11, task: 'Create LinkedIn Company Page', completed: false, link: 'https://www.linkedin.com/company/setup/new/' },
      { id: 12, task: 'Upload profile pictures (all platforms)', completed: false },
      { id: 13, task: 'Upload cover photos (all platforms)', completed: false },
      { id: 14, task: 'Write consistent bio (all platforms)', completed: false }
    ],
    websiteSetup: [
      { id: 15, task: 'Update website with company name', completed: true },
      { id: 16, task: 'Add company number to footer', completed: true },
      { id: 17, task: 'Create/upload logo', completed: false },
      { id: 18, task: 'Test all website pages', completed: false },
      { id: 19, task: 'Deploy website to Emergent', completed: false },
      { id: 20, task: 'Connect custom domain', completed: false },
      { id: 21, task: 'Update social media links', completed: false }
    ],
    legal: [
      { id: 22, task: 'Create Privacy Policy', completed: false },
      { id: 23, task: 'Create Terms & Conditions', completed: false },
      { id: 24, task: 'Create Cookie Policy', completed: false },
      { id: 25, task: 'Add legal pages to website', completed: false }
    ]
  });

  const toggleTask = (category, taskId) => {
    const updated = { ...checklist };
    const task = updated[category].find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setChecklist(updated);
      localStorage.setItem('companySetupChecklist', JSON.stringify(updated));
      toast.success(task.completed ? 'Task completed!' : 'Task unmarked');
    }
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('companySetupChecklist');
    if (saved) {
      setChecklist(JSON.parse(saved));
    }
  }, []);

  const calculateProgress = () => {
    const allTasks = Object.values(checklist).flat();
    const completedTasks = allTasks.filter(t => t.completed).length;
    return Math.round((completedTasks / allTasks.length) * 100);
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
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                  HIBISCUSPLUS LIMITED
                </h1>
                <p className="text-xs text-gray-500">Company No. 17024055</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Celebration Banner */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 p-4 bg-gradient-to-r from-rose-100 to-purple-100 rounded-full">
              <CheckCircle2 className="h-16 w-16 text-rose-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Congratulations! 🎉
            </h2>
            <p className="text-2xl font-bold text-gray-800 mb-2">HIBISCUSPLUS LIMITED</p>
            <Badge className="mb-4 bg-green-100 text-green-700 text-lg px-4 py-2">Company No. 17024055</Badge>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your company is now officially registered! Let's complete your setup and launch your business.
            </p>
            <div className="mt-6">
              <div className="inline-block bg-white border-2 border-rose-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Overall Progress</p>
                <p className="text-3xl font-bold text-rose-600">{calculateProgress()}%</p>
              </div>
            </div>
          </div>

          {/* Step 1: Domain & Email Setup */}
          <Card className="mb-8 border-rose-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <CardTitle className="text-2xl">Domain & Business Email Setup</CardTitle>
                  <CardDescription>First priority - your online identity</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Domain Registration */}
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-3 text-rose-700">📍 Domain Registration</h4>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold mb-2">Register: hibiscusplus.co.uk</p>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          <li>Go to Namecheap.com or 123-reg.co.uk</li>
                          <li>Search "hibiscusplus.co.uk"</li>
                          <li>Add to cart (£7-12/year)</li>
                          <li>Complete purchase</li>
                          <li>Save login details securely!</li>
                        </ol>
                        <Button className="mt-3 bg-rose-600 hover:bg-rose-700" asChild>
                          <a href="https://www.namecheap.com" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Register on Namecheap
                          </a>
                        </Button>
                      </div>
                      <div className="pt-3 border-t">
                        <p className="text-sm font-semibold mb-1">💡 Pro Tip:</p>
                        <p className="text-sm text-gray-700">Also register: hibiscusplus.com and hibiscusplus.uk to protect your brand (£20-30 total)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Email Setup */}
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-3 text-rose-700">📧 Business Email Setup</h4>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-3">Recommended: Hostinger Business Email (£0.59/month)</p>
                    <ol className="list-decimal list-inside space-y-2 text-sm mb-4">
                      <li>Go to Hostinger.co.uk</li>
                      <li>Select "Business Email"</li>
                      <li>Enter your domain: hibiscusplus.co.uk</li>
                      <li>Choose plan (£0.59/month for 10GB)</li>
                      <li>Create these email addresses:
                        <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                          <li>hello@hibiscusplus.co.uk (general inquiries)</li>
                          <li>orders@hibiscusplus.co.uk (customer orders)</li>
                          <li>info@hibiscusplus.co.uk (information requests)</li>
                        </ul>
                      </li>
                    </ol>
                    <Button className="bg-rose-600 hover:bg-rose-700" asChild>
                      <a href="https://www.hostinger.co.uk/business-email" target="_blank" rel="noopener noreferrer">
                        <Mail className="mr-2 h-4 w-4" />
                        Set Up Email on Hostinger
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                {checklist.domainAndEmail.map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:border-rose-300 transition-colors">
                    <button onClick={() => toggleTask('domainAndEmail', task.id)}>
                      {task.completed ? 
                        <CheckCircle2 className="h-6 w-6 text-green-600" /> : 
                        <Circle className="h-6 w-6 text-gray-400" />
                      }
                    </button>
                    <span className={task.completed ? 'line-through text-gray-500 flex-1' : 'flex-1'}>{task.task}</span>
                    {task.link && (
                      <Button size="sm" variant="ghost" asChild>
                        <a href={task.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Social Media Setup */}
          <Card className="mb-8 border-rose-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <CardTitle className="text-2xl">Social Media Accounts</CardTitle>
                  <CardDescription>Claim your handles before someone else does!</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Instagram */}
                <Card className="border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Instagram className="h-8 w-8 text-pink-600" />
                      <div>
                        <p className="font-bold">Instagram</p>
                        <p className="text-sm text-gray-600">@hibiscusplus</p>
                      </div>
                    </div>
                    <p className="text-sm mb-3">Most important for visual products. Create business account.</p>
                    <Button size="sm" className="w-full bg-pink-600 hover:bg-pink-700" asChild>
                      <a href="https://www.instagram.com/accounts/emailsignup/" target="_blank" rel="noopener noreferrer">
                        Create Account
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Facebook */}
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Facebook className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-bold">Facebook</p>
                        <p className="text-sm text-gray-600">HIBISCUSPLUS LIMITED</p>
                      </div>
                    </div>
                    <p className="text-sm mb-3">Business Page for local Manchester community.</p>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                      <a href="https://www.facebook.com/pages/creation/" target="_blank" rel="noopener noreferrer">
                        Create Page
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* TikTok */}
                <Card className="border-gray-800 bg-gradient-to-br from-gray-50 to-gray-100">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <MessageCircle className="h-8 w-8 text-gray-800" />
                      <div>
                        <p className="font-bold">TikTok</p>
                        <p className="text-sm text-gray-600">@hibiscusplus</p>
                      </div>
                    </div>
                    <p className="text-sm mb-3">Recipe videos, behind-the-scenes content.</p>
                    <Button size="sm" className="w-full bg-gray-800 hover:bg-gray-900" asChild>
                      <a href="https://www.tiktok.com/signup" target="_blank" rel="noopener noreferrer">
                        Create Account
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* LinkedIn */}
                <Card className="border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Linkedin className="h-8 w-8 text-blue-700" />
                      <div>
                        <p className="font-bold">LinkedIn</p>
                        <p className="text-sm text-gray-600">Company Page</p>
                      </div>
                    </div>
                    <p className="text-sm mb-3">B2B partnerships, wholesale opportunities.</p>
                    <Button size="sm" className="w-full bg-blue-700 hover:bg-blue-800" asChild>
                      <a href="https://www.linkedin.com/company/setup/new/" target="_blank" rel="noopener noreferrer">
                        Create Company
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Bio Template */}
              <Card className="bg-rose-50 border-rose-200 mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">📝 Consistent Bio Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-4 rounded border">
                    <pre className="text-sm whitespace-pre-wrap">
🌺 HIBISCUSPLUS LIMITED
Premium Nigerian Zobo & wellness teas
🍵 Traditional recipes | Modern wellness
📍 Manchester, UK | Market Stalls Monthly
🔗 www.hibiscusplus.co.uk
✉️ hello@hibiscusplus.co.uk
                    </pre>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Copy and paste this for all social media profiles</p>
                </CardContent>
              </Card>

              {/* Checklist */}
              <div className="space-y-3">
                {checklist.socialMedia.map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:border-rose-300 transition-colors">
                    <button onClick={() => toggleTask('socialMedia', task.id)}>
                      {task.completed ? 
                        <CheckCircle2 className="h-6 w-6 text-green-600" /> : 
                        <Circle className="h-6 w-6 text-gray-400" />
                      }
                    </button>
                    <span className={task.completed ? 'line-through text-gray-500 flex-1' : 'flex-1'}>{task.task}</span>
                    {task.link && (
                      <Button size="sm" variant="ghost" asChild>
                        <a href={task.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Website Deployment */}
          <Card className="mb-8 border-rose-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <CardTitle className="text-2xl">Website Deployment</CardTitle>
                  <CardDescription>Launch your professional website</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800">Website Already Updated!</p>
                      <p className="text-sm text-green-700 mt-1">
                        Your website now shows "HIBISCUSPLUS LIMITED" and Company No. 17024055 in the footer.
                      </p>
                    </div>
                  </div>
                </div>

                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg">🚀 Deployment Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">1</div>
                      <div>
                        <p className="font-semibold">Create/Upload Your Logo</p>
                        <p className="text-sm text-gray-600">Use Canva to create logo, then upload via /logo-guide</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">2</div>
                      <div>
                        <p className="font-semibold">Click "Deploy" in Emergent</p>
                        <p className="text-sm text-gray-600">Wait 10-15 minutes for build to complete</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">3</div>
                      <div>
                        <p className="font-semibold">Link Your Domain</p>
                        <p className="text-sm text-gray-600">Connect hibiscusplus.co.uk to your deployed site</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">4</div>
                      <div>
                        <p className="font-semibold">Test Everything</p>
                        <p className="text-sm text-gray-600">Check all pages, recipes, newsletter signup</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                {checklist.websiteSetup.map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:border-rose-300 transition-colors">
                    <button onClick={() => toggleTask('websiteSetup', task.id)}>
                      {task.completed ? 
                        <CheckCircle2 className="h-6 w-6 text-green-600" /> : 
                        <Circle className="h-6 w-6 text-gray-400" />
                      }
                    </button>
                    <span className={task.completed ? 'line-through text-gray-500 flex-1' : 'flex-1'}>{task.task}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Legal Pages */}
          <Card className="mb-8 border-rose-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
                <div>
                  <CardTitle className="text-2xl">Legal Pages</CardTitle>
                  <CardDescription>Required for e-commerce (can do after launch)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                These are important but not urgent. You can use free generators or hire a lawyer.
              </p>
              
              <div className="space-y-3">
                {checklist.legal.map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:border-rose-300 transition-colors">
                    <button onClick={() => toggleTask('legal', task.id)}>
                      {task.completed ? 
                        <CheckCircle2 className="h-6 w-6 text-green-600" /> : 
                        <Circle className="h-6 w-6 text-gray-400" />
                      }
                    </button>
                    <span className={task.completed ? 'line-through text-gray-500 flex-1' : 'flex-1'}>{task.task}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 Use TermsFeed.com or GetTerms.io to generate these for free
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Summary */}
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl">🎯 Your Immediate Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge className="bg-rose-600 text-white">TODAY</Badge>
                  <div>
                    <p className="font-semibold">1. Register hibiscusplus.co.uk domain</p>
                    <p className="text-sm text-gray-600">Takes 5 minutes, £7-12/year</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-rose-600 text-white">TODAY</Badge>
                  <div>
                    <p className="font-semibold">2. Set up business emails</p>
                    <p className="text-sm text-gray-600">Hostinger, £0.59/month, 3 email addresses</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-orange-500 text-white">THIS WEEK</Badge>
                  <div>
                    <p className="font-semibold">3. Create all social media accounts</p>
                    <p className="text-sm text-gray-600">Claim @hibiscusplus before someone else does!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-orange-500 text-white">THIS WEEK</Badge>
                  <div>
                    <p className="font-semibold">4. Create logo on Canva</p>
                    <p className="text-sm text-gray-600">30 minutes, FREE, use /logo-guide for help</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-500 text-white">WEEK 2</Badge>
                  <div>
                    <p className="font-semibold">5. Deploy website & connect domain</p>
                    <p className="text-sm text-gray-600">Go LIVE at www.hibiscusplus.co.uk!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="h-6 w-6 text-rose-400" />
            <h3 className="text-xl font-bold">HIBISCUSPLUS LIMITED</h3>
          </div>
          <p className="text-sm text-gray-400">Company No. 17024055</p>
          <p className="text-gray-500 text-sm mt-2">&copy; 2025 HIBISCUSPLUS LIMITED. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CompanySetupGuide;
