import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';

class Navbar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isNavbarExpanded: false
    };
  }

  handleNavbarBurgerClick = () => {
    this.setState(prevState => ({
      isNavbarExpanded: !prevState.isNavbarExpanded
    }));
  };

  render() {
    const { isNavbarExpanded } = this.state;
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              LOGO
            </Link>

            <button
              type="button"
              onClick={this.handleNavbarBurgerClick}
              className={`navbar-burger burger ${
                isNavbarExpanded ? 'is-active' : ''
              }`}
              aria-label="menu"
              aria-expanded={isNavbarExpanded}
              data-target="navbar"
            >
              {/* Hamburger logo */}
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <div
            id="navbar"
            className={`navbar-menu ${isNavbarExpanded ? 'is-active' : ''}`}
          >
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link to="/login" type="button" className="button is-light">
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    type="button"
                    className="button is-primary"
                  >
                    <strong>Sign up</strong>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
