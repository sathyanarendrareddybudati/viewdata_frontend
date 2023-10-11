import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo.jpeg';
import './header.css';

const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="navigation">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/data" className={location.pathname === '/data' ? 'active' : ''}>
          Data
        </Link>
        <Link to="/plot" className={location.pathname === '/plot' ? 'active' : ''}>
          Plot
        </Link>
      </div>
    </div>
  );
};

export default Header;
