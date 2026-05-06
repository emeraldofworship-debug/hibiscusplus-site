import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Blog from './pages/Blog';
import Markets from './pages/Markets';
import Breakfast from './pages/Breakfast';
import Feedback from './pages/Feedback';
import Shop from './pages/Shop';
import ShopSuccess from './pages/ShopSuccess';
import BrandAssets from './pages/BrandAssets';
import LaunchChecklist from './pages/LaunchChecklist';
import Suppliers from './pages/Suppliers';
import EmailTemplates from './pages/EmailTemplates';
import LogoGuide from './pages/LogoGuide';
import PreLaunchChecklist from './pages/PreLaunchChecklist';
import ManufacturerDocs from './pages/ManufacturerDocs';
import CompanySetupGuide from './pages/CompanySetupGuide';
import SocialMediaGuide from './pages/SocialMediaGuide';

import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import RecipesAdmin from './pages/admin/RecipesAdmin';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import BlogAdmin from './pages/admin/BlogAdmin';
import SubscribersAdmin from './pages/admin/SubscribersAdmin';
import FeedbackAdmin from './pages/admin/FeedbackAdmin';
import ChangePassword from './pages/admin/ChangePassword';
import BrandingAdmin from './pages/admin/BrandingAdmin';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import NotificationsAdmin from './pages/admin/NotificationsAdmin';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ScrollManager />
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/success" element={<ShopSuccess />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/breakfast" element={<Breakfast />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/brand-assets" element={<BrandAssets />} />

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/recipes" element={<ProtectedRoute><RecipesAdmin /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute><ProductsAdmin /></ProtectedRoute>} />
              <Route path="/admin/blog" element={<ProtectedRoute><BlogAdmin /></ProtectedRoute>} />
              <Route path="/admin/subscribers" element={<ProtectedRoute><SubscribersAdmin /></ProtectedRoute>} />
              <Route path="/admin/feedback" element={<ProtectedRoute><FeedbackAdmin /></ProtectedRoute>} />
              <Route path="/admin/orders" element={<ProtectedRoute><OrdersAdmin /></ProtectedRoute>} />
              <Route path="/admin/notifications" element={<ProtectedRoute><NotificationsAdmin /></ProtectedRoute>} />
              <Route path="/admin/branding" element={<ProtectedRoute><BrandingAdmin /></ProtectedRoute>} />
              <Route path="/admin/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

              {/* Internal guidance pages (hidden from public nav) */}
              <Route path="/checklist" element={<LaunchChecklist />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/email-templates" element={<EmailTemplates />} />
              <Route path="/logo-guide" element={<LogoGuide />} />
              <Route path="/pre-launch" element={<PreLaunchChecklist />} />
              <Route path="/manufacturer-docs" element={<ManufacturerDocs />} />
              <Route path="/company-setup" element={<CompanySetupGuide />} />
              <Route path="/social-media" element={<SocialMediaGuide />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
