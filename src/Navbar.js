import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/findClinic">Find Clinic</Link>
      <Link to="/imageAI">Medical Analysis</Link>
      <Link to="/talkAI">Medical AI</Link>

    </nav>
  );
}

export default Navbar;
