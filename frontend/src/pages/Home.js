import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Search, Heart, ShoppingCart, BookOpen, Mail, Leaf, Shield, Sparkles, Activity, Zap, ChevronRight, Filter, X, Bookmark, Printer } from 'lucide-react';
import { recipes, products, blogPosts, hibiscusBenefits } from '../mock';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedAilment, setSelectedAilment] = useState('');
  const [email, setEmail] = useState('');

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

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
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
                <CardFooter className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-rose-600">${product.price}</span>
                  <Button className="bg-rose-600 hover:bg-rose-700" onClick={() => toast.success('Added to cart!')}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
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
                <h3 className="text-xl font-bold">Hibiscus & Beyond</h3>
              </div>
              <p className="text-gray-400">Natural healing through hibiscus blends and artisanal wellness</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-rose-400 transition-colors">About</a></li>
                <li><a href="#recipes" className="hover:text-rose-400 transition-colors">Recipes</a></li>
                <li><a href="#shop" className="hover:text-rose-400 transition-colors">Shop</a></li>
                <li><a href="#blog" className="hover:text-rose-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Stress Relief</li>
                <li>Immunity Boost</li>
                <li>Heart Health</li>
                <li>Sleep Aid</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: hello@hibiscusandbeyond.co.uk</li>
                <li>Phone: +44 161 123 4567</li>
                <li>Manchester Monthly Stalls</li>
                <li>Hours: Mon-Fri 9am-5pm</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Hibiscus & Beyond. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;