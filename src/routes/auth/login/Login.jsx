import React from 'react';
import AuthContainer from 'components/authContainer';
import SocialLogin from './SocialLogin';

import '../styles.scss';

const Login = () => {
  return (
    <AuthContainer>
      <div className="login content-container">
        <SocialLogin />
      </div>
    </AuthContainer>
  );
};

export default Login;
