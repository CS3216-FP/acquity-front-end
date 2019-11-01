import React from 'react';
import { Link } from 'react-router-dom';

import { isUnapprovedBuyer } from 'utils/userUtils';
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
          className={`${isUnapprovedBuyer(user) ? '' : 'avatar--unapproved'}`}
          userName={user.fullName}
          profileImageUrl={user.profileImageUrl}
        />
      </button>
      <div className="navbar-dropdown is-right">
        {isUnapprovedBuyer(user) && (
          <>
            <div className="dropdown-item profile-dropdown__pending">
              Your account is still pending approval. Bids you make will not be
              included in the round until you are verified.
            </div>
            <hr className="navbar-divider" />
          </>
        )}
        <Link className="navbar-item font-light" to="/settings/profile">
          Account Settings
        </Link>
        <button
          type="button"
          aria-label="log out"
          className="navbar-item"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
