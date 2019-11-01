import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { useAuth } from 'contexts/authContext';
import AuthContainer from 'components/authContainer';

import '../styles.scss';

const LoginCallback = ({ history }) => {
  const { saveLinkedInToken } = useAuth();
  const { code } = queryString.parse(window.location.search);
  if (code) {
    saveLinkedInToken({ code });
    history.push('/login');
  }
  return <AuthContainer>hi</AuthContainer>;
};

export default withRouter(LoginCallback);
