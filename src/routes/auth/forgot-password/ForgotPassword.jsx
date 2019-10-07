import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import ForgotPasswordForm from './ForgotPasswordForm';

class ForgotPassword extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      requestMessage: '',
      isSuccessfulRequest: false
    };
  }

  handleFormSubmit = _data => {
    this.setState({ isSubmitting: true });
    // Mock db call
    setTimeout(() => {
      this.setState({
        isSubmitting: false,
        requestMessage:
          'A password reset link has been sent to the given email address and should arrive in a few minutes!',
        isSuccessfulRequest: true
      });
    }, 1000);
  };

  render() {
    const { isSubmitting, requestMessage, isSuccessfulRequest } = this.state;
    return (
      <div className="columns is-mobile is-centered">
        <div className="is-container column is-two-thirds-tablet is-four-fifths-mobile">
          <h1 className="form-title">Reset password</h1>
          <div className="form-wrapper">
            <div className="content">
              Forgot your password? We will send password reset instructions to
              your email address below.
            </div>
            {requestMessage && (
              <div
                className={`content has-text-${
                  isSuccessfulRequest ? 'success' : 'danger'
                }`}
              >
                {requestMessage}
              </div>
            )}
            {isSuccessfulRequest ? (
              <div>
                <Link to="/">Go back to home page</Link>
              </div>
            ) : (
              <ForgotPasswordForm
                onSubmit={this.handleFormSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          <div className="has-text-centered">
            <span>Already a member? </span>
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
