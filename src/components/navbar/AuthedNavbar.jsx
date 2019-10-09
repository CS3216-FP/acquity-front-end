import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import ProfileDropdown from './profile-dropdown';

import './AuthedNavbar.scss';

const AuthedNavbar = ({ isNavbarExpanded, location: { pathname } }) => {
  return (
    <div
      id="navbar"
      className={`navbar-menu ${isNavbarExpanded ? 'is-active' : ''}`}
    >
      <div className="navbar-item main-route-tabs">
        <div className="tabs is-centered">
          <ul>
            <li className={`${pathname === '/' ? 'is-active' : ''}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`${pathname === '/matches' ? 'is-active' : ''}`}>
              <Link to="/matches">Matches</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default withRouter(AuthedNavbar);
