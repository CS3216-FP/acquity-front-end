import React from 'react';
import queryString from 'query-string';
import { useAuth } from 'contexts/authContext';
import AuthContainer from 'components/authContainer';
import SocialLogin from './SocialLogin';

import '../styles.scss';

const Login = () => {
  const { saveLinkedInToken } = useAuth();
  const { code } = queryString.parse(window.location.search);
  if (code) {
    saveLinkedInToken({ code });
  }

  return (
    <AuthContainer>
      <div className="login content-container">
        <SocialLogin />
      </div>
    </AuthContainer>
  );
};

export default Login;
