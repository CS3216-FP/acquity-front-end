import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileDropdown from './profile-dropdown';

import './AuthedNavbar.scss';

const AuthTabs = ({ pathname }) => {
  return (
    <>
      <li
        className={`${
          pathname.match('(/home|/bids|/offers).*') ? 'is-active' : ''
        }`}
      >
        <Link to="/">Home</Link>
      </li>
      <li className={`${pathname.startsWith('/matches') ? 'is-active' : ''}`}>
        <Link to="/matches">Matches</Link>
      </li>
    </>
  );
};

const AdminTabs = () => {
  return (
    <li className="is-active">
      <Link to="/admin">Admin Panel</Link>
    </li>
  );
};

const AuthedNavbar = ({ isNavbarExpanded, isAdmin = false }) => {
  const { pathname } = useLocation();
  return (
    <div
      id="navbar"
      className={`navbar-menu ${isNavbarExpanded ? 'is-active' : ''}`}
    >
      <div className="navbar-item main-route-tabs">
        <div className="tabs is-centered">
          <ul>{isAdmin ? <AdminTabs /> : <AuthTabs pathname={pathname} />}</ul>
        </div>
      </div>
      <div className="navbar-end">
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default AuthedNavbar;
