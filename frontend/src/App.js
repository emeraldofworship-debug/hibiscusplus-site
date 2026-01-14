import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LaunchChecklist from './pages/LaunchChecklist';
import BrandAssets from './pages/BrandAssets';
import Suppliers from './pages/Suppliers';
import EmailTemplates from './pages/EmailTemplates';
import LogoGuide from './pages/LogoGuide';
import PreLaunchChecklist from './pages/PreLaunchChecklist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checklist" element={<LaunchChecklist />} />
          <Route path="/brand-assets" element={<BrandAssets />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/email-templates" element={<EmailTemplates />} />
          <Route path="/logo-guide" element={<LogoGuide />} />
          <Route path="/pre-launch" element={<PreLaunchChecklist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;