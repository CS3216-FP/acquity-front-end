import React from 'react';
import ProfileDropdown from './profile-dropdown';

const AuthedNavbar = ({ isNavbarExpanded }) => {
  return (
    <div
      id="navbar"
      className={`navbar-menu ${isNavbarExpanded ? 'is-active' : ''}`}
    >
      <div className="navbar-end">
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default AuthedNavbar;
