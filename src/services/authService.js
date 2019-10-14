import TokenUtils from 'utils/tokenUtils';
import ApiService from './apiService';

const logout = () => {
  TokenUtils.removeToken();
  return Promise.resolve();
};

const login = async ({ email, password }) => {
  const response = await ApiService.post('auth', { email, password });
  return TokenUtils.storeToken(response);
};

const register = async ({ email, password, fullName }) => {
  const response = await ApiService.post('user/', {
    email,
    password,
    fullName
  });

  if (response.status === 200) {
    return login({ email, password });
  }
  return Promise.reject(response.statusText);
};

const getUser = async () => {
  const token = TokenUtils.getToken();
  // No user yet.
  if (!token) {
    return Promise.resolve(null);
  }
  // Check with backend to see if key is still valid
  const response = await ApiService.get('auth/me');
  if (response.status === 200) {
    const { me: userData } = response.data;
    return userData;
  }
  logout();
  return Promise.reject(response.statusText);
};

export default { login, register, logout, getUser };
