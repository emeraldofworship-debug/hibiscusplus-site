import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
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
