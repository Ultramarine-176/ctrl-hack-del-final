import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Pages/Home';
import Clinic from './Pages/Clinic';
import TalkAI from './Pages/TalkAI';
import ImageAI from './Pages/ImageAI';
import Headache from './Pages/Headache';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findClinic" element={<Clinic />} />
        <Route path="/imageAI" element={<ImageAI />} />

        <Route path="/talkAI" element={<TalkAI />} />
          <Route path="/headache" element={<Headache />} /> 
      </Routes>
    </Router>
  );
}

export default App;
