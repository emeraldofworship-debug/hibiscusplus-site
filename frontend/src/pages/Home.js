import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Search, Heart, ShoppingCart, BookOpen, Mail, Leaf, Shield, Sparkles, Activity, Zap, ChevronRight, Filter, X, Bookmark, Printer, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedAilment, setSelectedAilment] = useState('');
  const [email, setEmail] = useState('');
  
  // API Data States
  const [recipes, setRecipes] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hibiscusBenefits = [
    {
      title: 'Rich in Antioxidants',
      description: 'Hibiscus is loaded with powerful antioxidants that may help prevent damage caused by free radicals.',
      icon: 'shield'
    },
    {
      title: 'Supports Heart Health',
      description: 'Studies suggest hibiscus tea may help lower blood pressure and support cardiovascular wellness.',
      icon: 'heart'
    },
    {
      title: 'Natural Vitamin C',
      description: 'High in vitamin C, hibiscus strengthens the immune system and promotes healthy skin.',
      icon: 'sparkles'
    },
    {
      title: 'Digestive Support',
      description: 'The natural compounds in hibiscus can aid digestion and support a healthy gut.',
      icon: 'leaf'
    },
    {
      title: 'Weight Management',
      description: 'May help with metabolism and support healthy weight management when combined with a balanced diet.',
      icon: 'activity'
    },
    {
      title: 'Anti-inflammatory',
      description: 'Contains compounds with anti-inflammatory properties that support overall wellness.',
      icon: 'zap'
    }
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [recipesRes, productsRes, blogRes] = await Promise.all([
          axios.get(`${API}/recipes`),
          axios.get(`${API}/products`),
          axios.get(`${API}/blog`)
        ]);
        
        setRecipes(recipesRes.data.data || []);
        setProducts(productsRes.data.data || []);
        setBlogPosts(blogRes.data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('savedRecipes');
    if (saved) {
      setSavedRecipes(JSON.parse(saved));
    }
  }, []);

  const categories = [
    { id: 'all', name: 'All Recipes' },
    { id: 'Stress Relief', name: 'Stress Relief' },
    { id: 'Immunity Boost', name: 'Immunity Boost' },
    { id: 'Digestive Health', name: 'Digestive Health' },
    { id: 'Heart Health', name: 'Heart Health' },
    { id: 'Sleep Aid', name: 'Sleep Aid' }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const recommendedRecipes = selectedAilment
    ? recipes.filter(recipe => recipe.ailments.includes(selectedAilment.toLowerCase()))
    : [];

  const toggleSaveRecipe = (recipeId) => {
    let updated;
    if (savedRecipes.includes(recipeId)) {
      updated = savedRecipes.filter(id => id !== recipeId);
      toast.success('Recipe removed from favorites');
    } else {
      updated = [...savedRecipes, recipeId];
      toast.success('Recipe saved to favorites!');
    }
    setSavedRecipes(updated);
    localStorage.setItem('savedRecipes', JSON.stringify(updated));
  };

  const printRecipe = (recipe) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${recipe.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #DC143C; }
            .section { margin: 20px 0; }
            ul { line-height: 1.8; }
          </style>
        </head>
        <body>
          <h1>${recipe.name}</h1>
          <p><strong>Category:</strong> ${recipe.category}</p>
          <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
          <div class="section">
            <h2>Ingredients</h2>
            <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
          </div>
          <div class="section">
            <h2>Instructions</h2>
            <ol>${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}</ol>
          </div>
          <div class="section">
            <h2>Benefits</h2>
            <p>${recipe.benefits}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleNewsletterSignup = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await axios.post(`${API}/newsletter/subscribe`, { email });
        if (response.data.success) {
          toast.success(response.data.message || 'Thank you for subscribing! Check your email for confirmation.');
          setEmail('');
        } else {
          toast.error(response.data.error || 'Failed to subscribe');
        }
      } catch (err) {
        console.error('Newsletter subscription error:', err);
        toast.error('Failed to subscribe. Please try again.');
      }
    }
  };

  const iconMap = {
    shield: Shield,
    heart: Heart,
    sparkles: Sparkles,
    leaf: Leaf,
    activity: Activity,
    zap: Zap
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
              <a href="#about" className="text-gray-700 hover:text-rose-600 transition-colors">About</a>
              <a href="#recipes" className="text-gray-700 hover:text-rose-600 transition-colors">Recipes</a>
              <a href="#shop" className="text-gray-700 hover:text-rose-600 transition-colors">Shop</a>
              <a href="#blog" className="text-gray-700 hover:text-rose-600 transition-colors">Blog</a>
              <a href="#contact" className="text-gray-700 hover:text-rose-600 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-transparent to-purple-100/50"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-200">Natural Wellness</Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
            Discover the Power of Hibiscus
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ancient wisdom meets modern wellness. Explore healing tea recipes and embrace natural health.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white transition-all transform hover:scale-105">
              <a href="#recipes">Explore Recipes</a>
            </Button>
            <Button size="lg" variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50 transition-all">
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Hibiscus Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Hibiscus?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hibiscus has been treasured for centuries for its remarkable health benefits and vibrant flavor.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hibiscusBenefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              return (
                <Card key={index} className="border-rose-100 hover:border-rose-300 transition-all hover:shadow-lg transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-rose-600" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tea Recipes Section */}
      <section id="recipes" className="py-20 px-4 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Healing Tea Recipes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carefully crafted blends for your wellbeing journey
            </p>
          </div>

          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="browse">Browse Recipes</TabsTrigger>
              <TabsTrigger value="finder">Recipe Finder</TabsTrigger>
            </TabsList>

            {/* Browse Recipes Tab */}
            <TabsContent value="browse">
              {/* Search and Filter */}
              <div className="mb-8 space-y-4">
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search recipes or ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-rose-200 focus:border-rose-400"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map(cat => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={selectedCategory === cat.id 
                        ? "bg-rose-600 hover:bg-rose-700" 
                        : "border-rose-200 text-rose-700 hover:bg-rose-50"}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Recipe Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRecipes.map(recipe => (
                  <Card key={recipe.id} className="overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
                    <div className="h-48 overflow-hidden">
                      <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-purple-100 text-purple-700">{recipe.category}</Badge>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleSaveRecipe(recipe.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Bookmark className={`h-4 w-4 ${savedRecipes.includes(recipe.id) ? 'fill-rose-600 text-rose-600' : 'text-gray-400'}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => printRecipe(recipe)}
                            className="h-8 w-8 p-0"
                          >
                            <Printer className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{recipe.name}</CardTitle>
                      <CardDescription>{recipe.prepTime}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{recipe.benefits}</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full border-rose-300 text-rose-600 hover:bg-rose-50">
                            View Recipe <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{recipe.name}</DialogTitle>
                            <DialogDescription>{recipe.category} • {recipe.prepTime}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold mb-2 text-lg">Benefits</h4>
                              <p className="text-gray-600">{recipe.benefits}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2 text-lg">Ingredients</h4>
                              <ul className="list-disc list-inside space-y-1 text-gray-600">
                                {recipe.ingredients.map((ing, idx) => (
                                  <li key={idx}>{ing}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2 text-lg">Instructions</h4>
                              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                                {recipe.instructions.map((inst, idx) => (
                                  <li key={idx}>{inst}</li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recipe Finder Tab */}
            <TabsContent value="finder">
              <div className="max-w-2xl mx-auto">
                <Card className="border-rose-200">
                  <CardHeader>
                    <CardTitle className="text-2xl">Find Your Perfect Blend</CardTitle>
                    <CardDescription>Select your health concern and we'll recommend the perfect recipe</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {['Stress Relief', 'Immunity Boost', 'Digestive Health', 'Heart Health', 'Sleep Aid', 'Energy'].map(ailment => (
                        <Button
                          key={ailment}
                          variant={selectedAilment === ailment ? "default" : "outline"}
                          onClick={() => setSelectedAilment(ailment)}
                          className={selectedAilment === ailment 
                            ? "bg-rose-600 hover:bg-rose-700 h-auto py-4" 
                            : "border-rose-200 text-rose-700 hover:bg-rose-50 h-auto py-4"}
                        >
                          {ailment}
                        </Button>
                      ))}
                    </div>
                    
                    {recommendedRecipes.length > 0 && (
                      <div className="mt-8 space-y-4">
                        <h4 className="font-semibold text-lg">Recommended for you:</h4>
                        {recommendedRecipes.map(recipe => (
                          <Card key={recipe.id} className="border-rose-100">
                            <CardHeader>
                              <CardTitle>{recipe.name}</CardTitle>
                              <CardDescription>{recipe.benefits}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="bg-rose-600 hover:bg-rose-700">
                                    View Full Recipe
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle className="text-2xl">{recipe.name}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-6">
                                    <div>
                                      <h4 className="font-semibold mb-2">Ingredients</h4>
                                      <ul className="list-disc list-inside space-y-1">
                                        {recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
                                      </ul>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Instructions</h4>
                                      <ol className="list-decimal list-inside space-y-2">
                                        {recipe.instructions.map((inst, idx) => <li key={idx}>{inst}</li>)}
                                      </ol>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          {/* Coming Soon Banner */}
          <div className="max-w-3xl mx-auto mb-12">
            <Card className="border-rose-200 bg-gradient-to-r from-rose-50 to-purple-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Badge className="mb-4 bg-rose-600 text-white hover:bg-rose-700">Coming Soon</Badge>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">We're Getting Ready to Launch!</h3>
                  <p className="text-gray-600 mb-4">
                    Our shop is currently in development. We're working on bringing you the finest hibiscus blends and wellness products.
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Currently completing business registration with Manchester City Council. Products will be available soon!
                  </p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button className="bg-rose-600 hover:bg-rose-700" onClick={() => window.location.href = '#contact'}>
                      Get Notified at Launch
                    </Button>
                    <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50" onClick={() => window.location.href = '/checklist'}>
                      View Launch Progress
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Coming Soon: Premium Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              High-quality organic hibiscus and carefully curated blends
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="h-64 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <Badge className="w-fit bg-purple-100 text-purple-700 mb-2">{product.category}</Badge>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {product.allergen_info && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs font-semibold text-yellow-800 mb-1">⚠️ Allergen Information:</p>
                      <p className="text-xs text-yellow-700">{product.allergen_info}</p>
                      {product.allergen_free && (
                        <p className="text-xs text-green-700 mt-1">✓ {product.allergen_free}</p>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-rose-600">${product.price}</span>
                  <Button className="bg-rose-600 hover:bg-rose-700" onClick={() => toast.info('Products coming soon! Sign up for our newsletter to be notified.')}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Latest Articles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Insights, research, and tips for your wellness journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <Badge className="w-fit bg-rose-100 text-rose-700 mb-2">{post.category}</Badge>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.readTime}</span>
                  <Button variant="ghost" className="text-rose-600 hover:text-rose-700">
                    Read More <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Newsletter Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-rose-100 to-purple-100">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Stay Connected</h2>
            <p className="text-lg text-gray-600">
              Join our community and receive exclusive recipes, wellness tips, and special offers
            </p>
          </div>
          <Card className="border-rose-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Subscribe to Our Newsletter</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewsletterSignup} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 border-rose-200 focus:border-rose-400"
                  />
                  <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
                    <Mail className="mr-2 h-4 w-4" />
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-rose-400" />
                <h3 className="text-xl font-bold">HIBISCUSPLUS LIMITED</h3>
              </div>
              <p className="text-gray-400 text-sm">Company No. 17024055</p>
              <p className="text-gray-400">Natural healing through hibiscus blends and artisanal wellness</p>
              
              {/* Social Media Links */}
              <div className="flex gap-3 mt-6">
                <a href="https://instagram.com/hibiscusandbeyond" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://facebook.com/hibiscusandbeyond" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@hibiscusandbeyond" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="https://pinterest.co.uk/hibiscusandbeyond" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/hibiscus-and-beyond" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-rose-400 transition-colors">About</a></li>
                <li><a href="#recipes" className="hover:text-rose-400 transition-colors">Recipes</a></li>
                <li><a href="#shop" className="hover:text-rose-400 transition-colors">Shop</a></li>
                <li><a href="#blog" className="hover:text-rose-400 transition-colors">Blog</a></li>
                <li><a href="/checklist" className="hover:text-rose-400 transition-colors">Launch Progress</a></li>
                <li><a href="/brand-assets" className="hover:text-rose-400 transition-colors">Brand Assets</a></li>
                <li><a href="/suppliers" className="hover:text-rose-400 transition-colors">Suppliers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Stress Relief</li>
                <li>Immunity Boost</li>
                <li>Heart Health</li>
                <li>Sleep Aid</li>
                <li>Digestive Health</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get In Touch</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <a href="mailto:hello@hibiscusandbeyond.co.uk" className="hover:text-rose-400 transition-colors">
                      hello@hibiscusandbeyond.co.uk
                    </a>
                    <p className="text-sm text-gray-500">General inquiries</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <a href="mailto:orders@hibiscusandbeyond.co.uk" className="hover:text-rose-400 transition-colors">
                      orders@hibiscusandbeyond.co.uk
                    </a>
                    <p className="text-sm text-gray-500">Orders & support</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="hover:text-rose-400 transition-colors">+44 161 123 4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9am-5pm</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p>Manchester, UK</p>
                    <p className="text-sm text-gray-500">Monthly market stalls</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HIBISCUSPLUS LIMITED. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-2">Registered in England and Wales | Company No. 17024055</p>
            <p className="text-sm text-gray-500">Natural healing through hibiscus blends and artisanal wellness</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;