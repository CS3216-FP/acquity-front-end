import React, { useState } from 'react';
import AuthService from 'services/authService';
import TypeSelector from './TypeSelector';

import './LoginForm.scss';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await AuthService.getLinkedInRedirect();
    window.location.replace(response.data);
  };

  return (
    <div className="login">
      <div className="login__type">
        <span className="login__type--text">I am a:</span>
        <TypeSelector />
      </div>
      <div className="login__action">
        <button
          type="button"
          onClick={handleLogin}
          disabled={isLoading}
          className={`button button--cta hvr-grow login__button ${
            isLoading ? 'is-loading' : ''
          }`}
        >
          Login Now with LinkedIn
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
