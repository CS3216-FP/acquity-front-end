import TokenUtils from 'utils/tokenUtils';
import ApiClientService from './apiClientService';

const logout = () => {
  TokenUtils.removeToken();
  return Promise.resolve();
};

const login = async ({ email, password }) => {
  const response = await ApiClientService('auth/seller', {
    data: { email, password }
  });
  return TokenUtils.storeToken(response);
};

const register = async ({ username, password }) => {
  const response = await ApiClientService('register', {
    data: { username, password }
  });
  return TokenUtils.storeToken(response);
};

const getUser = async () => {
  const token = TokenUtils.getToken();
  // No user yet.
  if (!token) {
    return Promise.resolve(null);
  }
  // Check with backend to see if key is still valid
  const response = await ApiClientService('auth/seller/me');
  if (response.status === 200) {
    const { me: userData } = response.data;
    return {
      id: userData.id,
      fullname: userData.full_name,
      email: userData.email
    };
  }
  logout();
  return Promise.reject(response.statusText);
};

export default { login, register, logout, getUser };
