import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LaunchChecklist from './pages/LaunchChecklist';
import BrandAssets from './pages/BrandAssets';
import Suppliers from './pages/Suppliers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checklist" element={<LaunchChecklist />} />
          <Route path="/brand-assets" element={<BrandAssets />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;