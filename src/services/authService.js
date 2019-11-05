import store from 'app/store';

import { SITE_URL } from 'constants/urls';
import TokenUtils from 'utils/tokenUtils';
import { setUser, clearUser } from 'reducers/MiscDux';
import ApiService from './apiService';

const logout = () => {
  TokenUtils.removeToken();
  store.dispatch(clearUser());
  return Promise.resolve();
};

const login = async ({ userType, code }) => {
  const requestBody = {
    redirectUri: `${SITE_URL}/auth/callback`,
    code,
    userType
  };
  const response = await ApiService.post(`/auth/linkedin`, requestBody).catch(
    error => {
      return Promise.reject(new Error(error));
    }
  );
  return TokenUtils.storeToken(response);
};

const getLinkedInRedirect = () => {
  return ApiService.get('/auth/linkedin', {
    params: {
      redirectUri: `${SITE_URL}/auth/callback`
    }
  });
};

const getUser = async () => {
  const token = TokenUtils.getToken();
  // No user yet.
  if (!token) {
    return Promise.resolve(null);
  }

  // Check with backend to see if key is still valid
  try {
    const response = await ApiService.get('auth/me');
    if (response.status === 200) {
      const { me: userData } = response.data;
      store.dispatch(setUser({ ...userData, lastRetrieved: Date.now() }));
      return userData;
    }
    throw new Error({
      status: response.statusText,
      message: response.statusText
    });
  } catch (error) {
    logout();
    return Promise.reject(new Error(error));
  }
};

export default {
  login,
  logout,
  getUser,
  getLinkedInRedirect
};
