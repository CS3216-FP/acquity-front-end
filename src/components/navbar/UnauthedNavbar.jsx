import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Navbar.scss';

const UnauthedNavbar = ({ isNavbarExpanded, location }) => {
  const { pathname } = location;
  return (
    <div
      id="navbar"
      className={`navbar-menu ${isNavbarExpanded ? 'is-active' : ''}`}
    >
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {pathname !== '/login' && (
              <Link to="/login" type="button" className="button is-light">
                Log in
              </Link>
            )}
            {pathname !== '/signup' && (
              <Link to="/signup" type="button" className="button is-primary">
                <strong>Sign up</strong>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UnauthedNavbar);
