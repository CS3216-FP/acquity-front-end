import React from 'react';
import './LoginForm.scss';
import TypeSelector from './TypeSelector';

const LoginForm = () => {
  return (
    <div className="login">
      <div className="login__type">
        <span className="login__type--text">I am a:</span>
        <TypeSelector />
      </div>
      <div className="login__action">
        <button
          type="button"
          className="button button--cta hvr-grow login__button"
        >
          Login Now with LinkedIn
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
