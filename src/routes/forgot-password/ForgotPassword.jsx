import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import ForgotPasswordForm from './ForgotPasswordForm';

class ForgotPassword extends PureComponent {
  render() {
    return (
      <div className="section is-fullheight">
        <div className="container">
          <div className="column is-4 is-offset-4">
            <ForgotPasswordForm />
            <div className="box has-text-centered">
              <span>Already a member? </span>
              <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
