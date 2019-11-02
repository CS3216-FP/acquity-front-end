import React from 'react';
import { Link } from 'react-router-dom';

import AuthContainer from 'components/authContainer';
import LoginForm from './LoginForm';

import '../styles.scss';

const Login = () => {
  return (
    <AuthContainer>
      <div className="login content-container">
        <h1 className="form-title">Sign In</h1>
        <div className="form-wrapper">
          <LoginForm />
        </div>

        <div className="actions">
          <Link className="actions__signup" to="/signup">
            Don&apos;t have an account yet? Sign up here.
          </Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
