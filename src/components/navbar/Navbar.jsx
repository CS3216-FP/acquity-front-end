import React, { PureComponent } from 'react';
import UnauthedNavbar from './UnauthedNavbar';

import './Navbar.scss';

class Navbar extends PureComponent {
  render() {
    const { isAuthenticated } = this.props;
    return isAuthenticated ? (
      <div>
        {/* TODO: Add AuthedNavBar component */}
        Should be authed
      </div>
    ) : (
      <UnauthedNavbar />
    );
  }
}

export default Navbar;
