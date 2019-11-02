import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import BrandLogoWhite from 'components/svgr/BrandLogoWhite';
import BrandLogo from 'components/svgr/BrandLogo';
import AuthedNavbar from './AuthedNavbar';

import './Navbar.scss';

const Navbar = ({ isAuthenticated }) => {
  const { pathname } = useLocation();
  const isAdminPath = pathname.match('(/admin).*');
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  const handleNavbarBurgerClick = () => {
    setIsNavbarExpanded(!isNavbarExpanded);
  };

  return (
    <nav
      className={`navbar is-fixed-top ${
        isAuthenticated ? 'navbar--background-white' : ''
      } ${isAdminPath ? 'is-dark navbar--admin' : ''}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          {isAdminPath ? (
            <BrandLogoWhite width="8rem" />
          ) : (
            <BrandLogo width="8rem" />
          )}
        </Link>

        {isAuthenticated && (
          <button
            type="button"
            onClick={handleNavbarBurgerClick}
            className={`navbar-burger burger ${
              isNavbarExpanded ? 'is-active' : ''
            }`}
            aria-label="menu"
            aria-expanded={isNavbarExpanded}
            data-target="navbar"
          >
            {/* Hamburger logo */}
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        )}
      </div>
      {isAuthenticated && (
        <AuthedNavbar
          isNavbarExpanded={isNavbarExpanded}
          isAdmin={isAdminPath}
        />
      )}
    </nav>
  );
};

export default Navbar;
