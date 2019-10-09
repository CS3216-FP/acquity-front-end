import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import BrandLogo from 'components/svgr/BrandLogo';
import UnauthedNavbar from './UnauthedNavbar';
import AuthedNavbar from './AuthedNavbar';

import './Navbar.scss';

const Navbar = ({ isAuthenticated }) => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  const handleNavbarBurgerClick = () => {
    setIsNavbarExpanded(!isNavbarExpanded);
  };

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <BrandLogo width="8rem" />
          </Link>

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
        </div>
        {isAuthenticated ? (
          <AuthedNavbar isNavbarExpanded={isNavbarExpanded} />
        ) : (
          <UnauthedNavbar isNavbarExpanded={isNavbarExpanded} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
