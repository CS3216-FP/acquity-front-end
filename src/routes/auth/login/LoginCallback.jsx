import React from 'react';
import queryString from 'query-string';
import { useAuth } from 'contexts/authContext';
import ApiService from '../../../services/apiService';

const LoginCallback = () => {
  const { saveLinkedInToken } = useAuth();

  const fetchToken = ({ code }) => {
    return ApiService.post('auth/login', { code }).then(r => {
      saveLinkedInToken(r);
    });
  };

  const { code } = queryString.parse(window.location.search);
  fetchToken({ code });
  return <div />;
};

export default LoginCallback;
