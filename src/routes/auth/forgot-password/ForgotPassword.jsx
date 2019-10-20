import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

import AuthContainer from 'components/authContainer';
import ForgotPasswordForm from './ForgotPasswordForm';

import './ForgotPassword.scss';
import '../styles.scss';

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
    <AuthContainer>
      <div className="content-container forgetPassword">
        <div className="notification is-danger">
          Password reset is not working at this time.
        </div>
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
            <div className="actions">
              <Link to="/">Go back to home page</Link>
            </div>
          ) : (
            <>
              <ForgotPasswordForm
                onSubmit={handleFormSubmit}
                isSubmitting={state.isSubmitting}
              />

              <div className="actions">
                <div>
                  <span className="text">Back to </span>
                  <Link to="/login">log in</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AuthContainer>
  );
};

export default ForgotPassword;
