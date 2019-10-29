import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'contexts/authContext';
import AuthContainer from 'components/authContainer';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';

import '../styles.scss';

const Login = () => {
  const { login } = useAuth();

  return (
    <AuthContainer>
      <div className="login content-container">
        <SocialLogin />
        <h1 className="form-title">Sign In</h1>
        <div className="form-wrapper">
          <LoginForm onSubmit={login} />
        </div>

        <div className="actions">
          <Link className="actions__forgetpassword" to="/forgot-password">
            Forgot your password?
          </Link>
          <Link className="actions__signup" to="/signup">
            Don&apos;t have an account yet? Sign up here.
          </Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
