import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'contexts/authContext';
import LoginForm from './LoginForm';

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="content-container">
      <h1 className="form-title">Log in</h1>
      <div className="form-wrapper">
        <LoginForm onSubmit={login} />
      </div>
      <div className="has-text-centered">
        <span>Don&apos;t have an account yet? </span>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
