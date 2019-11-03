import React from 'react';
import { useLocation } from 'react-router-dom';

import ErrorMessage from 'components/errorMessage';
import AuthContainer from 'components/authContainer';
import LoginForm from './LoginForm';

import '../styles.scss';

const Login = () => {
  const { error } = useLocation();

  return (
    <AuthContainer>
      <div className="login content-container">
        <h1 className="form-title">Log In</h1>

        {error && (
          <ErrorMessage message="Something went wrong. Try logging in again." />
        )}
        <div className="form-wrapper">
          <LoginForm />
        </div>

        <div className="actions">
          <span className="actions__signup">
            Don&apos;t have an account yet? <br />
            Just sign in with LinkedIn and we&apos;ll do the rest.
          </span>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
