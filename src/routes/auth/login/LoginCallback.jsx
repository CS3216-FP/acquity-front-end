import React from 'react';
import queryString from 'query-string';
import { useAuth } from 'contexts/authContext';
import ApiService from '../../../services/apiService';

async function fetchToken({ code }) {
  return ApiService.post('auth/login', { code });
}

const LoginCallback = async () => {
  const { saveLinkedInToken } = useAuth();

  const { code } = queryString.parse(window.location.search);

  const response = await fetchToken({ code });
  saveLinkedInToken(response);
  return <div />;
};

export default LoginCallback;
