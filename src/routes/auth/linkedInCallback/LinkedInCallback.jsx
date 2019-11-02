import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';

import { useAuth } from 'contexts/authContext';
import AuthContainer from 'components/authContainer';

import '../styles.scss';

const LinkedInCallback = () => {
  const { login } = useAuth();
  const location = useLocation();
  const { code } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const { userType } = useSelector(state => state.misc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    login({ code, userType }).catch(() => {
      setHasError(true);
    });
  }, [code, userType, login]);

  if (hasError) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          error: true
        }}
      />
    );
  }

  return (
    <AuthContainer>
      <div className="content-container">Redirecting...</div>
    </AuthContainer>
  );
};

export default LinkedInCallback;
