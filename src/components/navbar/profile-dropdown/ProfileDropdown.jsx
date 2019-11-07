import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from 'components/avatar';
import { isUnapprovedBuyer, isCommittee, isSeller } from 'utils/userUtils';
import { HOME, SETTINGS, ADMIN } from 'constants/routes';
import { useUser } from 'contexts/userContext';
import { useAuth } from 'contexts/authContext';
import { setUserType } from 'reducers/MiscDux';
import { BUYER, SELLER } from 'constants/user';

import './ProfileDropdown.scss';

const RoleSwitcher = () => {
  const dispatch = useDispatch();
  const { userType } = useSelector(rootState => rootState.misc);
  const handleSwitchToBuyer = () => {
    dispatch(setUserType(BUYER));
  };

  const handleSwitchToSeller = () => {
    dispatch(setUserType(SELLER));
  };

  return (
    <>
      {userType === BUYER ? (
        <button
          type="button"
          aria-label="switch to seller"
          className="navbar-item"
          onClick={handleSwitchToSeller}
        >
          Switch to Seller Role
        </button>
      ) : (
        <button
          type="button"
          aria-label="switch to buyer"
          className="navbar-item"
          onClick={handleSwitchToBuyer}
        >
          Switch to Buyer Role
        </button>
      )}
      <hr className="navbar-divider" />
    </>
  );
};

const ProfileDropdown = ({ isInAdminPath = false }) => {
  const user = useUser();
  const { logout } = useAuth();

  return (
    <div className="profile-dropdown navbar-item has-dropdown is-hoverable">
      <button type="button" className="navbar-link">
        <Avatar
          className={`${isUnapprovedBuyer(user) ? 'avatar--unapproved' : ''}`}
          userName={user.fullName}
          profileImageUrl={user.displayImageUrl}
        />
      </button>
      <div className="navbar-dropdown is-right">
        {isSeller(user) && <RoleSwitcher />}
        {isUnapprovedBuyer(user) && (
          <>
            <div className="dropdown-item profile-dropdown__pending">
              Your account is still pending approval. Bids you make will not be
              included in the round until you are verified.
            </div>
            <hr className="navbar-divider" />
          </>
        )}
        {isCommittee(user) && (
          <>
            {isInAdminPath ? (
              <Link className="navbar-item font-light" to={HOME}>
                User View
              </Link>
            ) : (
              <Link className="navbar-item font-light" to={ADMIN}>
                Admin View
              </Link>
            )}
            <hr className="navbar-divider" />
          </>
        )}
        <Link className="navbar-item font-light" to={`${SETTINGS}/profile`}>
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
