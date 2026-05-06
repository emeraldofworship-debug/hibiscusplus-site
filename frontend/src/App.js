import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Blog from './pages/Blog';
import Markets from './pages/Markets';
import Breakfast from './pages/Breakfast';
import Feedback from './pages/Feedback';
import BrandAssets from './pages/BrandAssets';
import LaunchChecklist from './pages/LaunchChecklist';
import Suppliers from './pages/Suppliers';
import EmailTemplates from './pages/EmailTemplates';
import LogoGuide from './pages/LogoGuide';
import PreLaunchChecklist from './pages/PreLaunchChecklist';
import ManufacturerDocs from './pages/ManufacturerDocs';
import CompanySetupGuide from './pages/CompanySetupGuide';
import SocialMediaGuide from './pages/SocialMediaGuide';

// Scroll to anchor when location.hash present, top otherwise.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/breakfast" element={<Breakfast />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/brand-assets" element={<BrandAssets />} />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
