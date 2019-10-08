import React from 'react';
import { Link } from 'react-router-dom';

import { getInitials } from 'utils';
import { useUser } from 'contexts/userContext';
import { useAuth } from 'contexts/authContext';

import './ProfileDropdown.scss';

const ProfileDropdown = () => {
  const user = useUser();
  const { logout } = useAuth();

  return (
    <div className="profile-dropdown navbar-item has-dropdown is-hoverable">
      <button type="button" className="navbar-link">
        <div className="avatar">
          {user.profileImageUrl ? (
            <figure className="profile-pic">
              <img alt="user avatar" src={user.profileImageUrl} />
            </figure>
          ) : (
            <span className="initials">{getInitials(user.fullName)}</span>
          )}
        </div>
      </button>
      <div className="navbar-dropdown is-right is-container">
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
