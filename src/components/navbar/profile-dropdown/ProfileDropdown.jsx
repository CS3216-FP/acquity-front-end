import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from 'contexts/userContext';
import { useAuth } from 'contexts/authContext';

import Avatar from 'components/avatar';
import './ProfileDropdown.scss';

const ProfileDropdown = () => {
  const user = useUser();
  const { logout } = useAuth();

  return (
    <div className="profile-dropdown navbar-item has-dropdown is-hoverable">
      <button type="button" className="navbar-link">
        <Avatar
          userName={user.fullName}
          profileImageUrl={user.profileImageUrl}
        />
      </button>
      <div className="navbar-dropdown is-right">
        <Link className="navbar-item" to="/profile">
          <span className="icon">
            <i className="fas fa-user" />
          </span>
          Account
        </Link>
        <hr className="navbar-divider" />
        <Link className="navbar-item" to="/settings/profile">
          <span className="icon">
            <i className="fas fa-cog" />
          </span>
          Account Settings
        </Link>
        <button
          type="button"
          aria-label="log out"
          className="navbar-item"
          onClick={logout}
        >
          <span className="icon">
            <i className="fas fa-door-open" />
          </span>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
