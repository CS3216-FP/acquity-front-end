import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = () => {
  const [state, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    isSubmitting: false,
    requestMessage: '',
    isSuccessfulRequest: false
  });

  const handleFormSubmit = _data => {
    setState({ isSubmitting: true });
    // Mock db call
    setTimeout(() => {
      setState({
        isSubmitting: false,
        requestMessage:
          'A password reset link has been sent to the given email address and should arrive in a few minutes!',
        isSuccessfulRequest: true
      });
    }, 1000);
  };

  return (
    <div className="auth-container columns is-mobile is-centered">
      <div className="is-container column is-two-thirds-tablet is-four-fifths-mobile">
        <h1 className="form-title">Reset password</h1>
        <div className="form-wrapper">
          <div className="content">
            Forgot your password? We will send password reset instructions to
            your email address below.
          </div>
          {state.requestMessage && (
            <div
              className={`content has-text-${
                state.isSuccessfulRequest ? 'success' : 'danger'
              }`}
            >
              {state.requestMessage}
            </div>
          )}
          {state.isSuccessfulRequest ? (
            <div>
              <Link to="/">Go back to home page</Link>
            </div>
          ) : (
            <ForgotPasswordForm
              onSubmit={handleFormSubmit}
              isSubmitting={state.isSubmitting}
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
};

export default ForgotPassword;
