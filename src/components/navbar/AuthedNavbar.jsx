import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { HOME, BIDS, OFFERS, CHAT, ROOT, ADMIN } from 'constants/routes';

import ProfileDropdown from './profile-dropdown';

import './AuthedNavbar.scss';

const AuthTabs = ({ pathname }) => {
  const hasUnreadMessages = useSelector(state =>
    Object.values(state.chat.unarchived).some(chat => chat.unreadCount > 0)
  );

  return (
    <>
      <li
        className={`${
          pathname.match(`(${HOME}|${BIDS}|${OFFERS})`) ? 'is-active' : ''
        }`}
      >
        <Link to={ROOT}>Home</Link>
      </li>
      <li className={`${pathname.startsWith(`${CHAT}`) ? 'is-active' : ''}`}>
        <Link to={CHAT}>
          {hasUnreadMessages ? (
            <span
              className="has-badge-rounded has-badge-danger has-badge-small"
              data-badge=""
            >
              Matches
            </span>
          ) : (
            <span>Matches</span>
          )}
        </Link>
      </li>
    </>
  );
};

const AdminTabs = () => {
  return (
    <li className="is-active">
      <Link to={ADMIN}>Admin Panel</Link>
    </li>
  );
};

const AuthedNavbar = ({ isNavbarExpanded, isInAdminPath = false }) => {
  const { pathname } = useLocation();
  return (
    <div
      id="navbar"
      className={`navbar-menu ${isNavbarExpanded ? 'is-active' : ''}`}
    >
      <div className="navbar-item main-route-tabs">
        <div className="tabs is-centered">
          <ul>
            {isInAdminPath ? <AdminTabs /> : <AuthTabs pathname={pathname} />}
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <ProfileDropdown isInAdminPath={isInAdminPath} />
      </div>
    </div>
  );
};

export default AuthedNavbar;
