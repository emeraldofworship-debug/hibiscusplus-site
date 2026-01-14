import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LaunchChecklist from './pages/LaunchChecklist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checklist" element={<LaunchChecklist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;