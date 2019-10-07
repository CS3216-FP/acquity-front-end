import React from 'react';
import ProfileDropdown from './profile-dropdown';
import NotificationButton from './notification';

const AuthedNavbar = ({ isNavbarExpanded }) => {
  return (
    <div
      id="navbar"
      className={`navbar-menu ${isNavbarExpanded ? 'is-active' : ''}`}
    >
      <div className="navbar-end">
        <NotificationButton />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default AuthedNavbar;
