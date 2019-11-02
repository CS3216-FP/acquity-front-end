import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from 'services/authService';
import TypeSelector from './TypeSelector';

import './LoginForm.scss';

const LoginForm = () => {
  const [hasError, setHasError] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);

  const handleLogin = () => {
    AuthService.getLinkedInRedirect()
      .then(res => setRedirectUrl(res.data))
      .catch(() => {
        setHasError(true);
      });
  };

  if (redirectUrl) {
    return <Redirect to={redirectUrl} />;
  }

  return (
    <div className="login">
      {hasError && (
        <div className="notification is-danger">
          Something went wrong. Try signing in again.
        </div>
      )}
      <div className="login__type">
        <span className="login__type--text">I am a:</span>
        <TypeSelector />
      </div>
      <div className="login__action">
        <button
          type="button"
          onClick={handleLogin}
          className="button button--cta hvr-grow login__button"
        >
          Login Now with LinkedIn
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
