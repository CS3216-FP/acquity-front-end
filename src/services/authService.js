import ApiClientService from './apiClientService';
import { TOKEN_KEY } from './consts';

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const storeToken = async response => {
  if (response.status === 200) {
    localStorage.setItem(TOKEN_KEY, response.data.access_token);
    return Promise.resolve(null);
  }
  return Promise.reject(response.statusText);
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  return Promise.resolve();
};

const login = async ({ email, password }) => {
  const response = await ApiClientService('auth/seller', {
    data: { email, password }
  });
  return storeToken(response);
};

const register = async ({ username, password }) => {
  const response = await ApiClientService('register', {
    data: { username, password }
  });
  return storeToken(response);
};

const getUser = async () => {
  const token = getToken();
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

export default { login, register, logout, getToken, getUser };
