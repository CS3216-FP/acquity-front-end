import ApiClientService from './apiClientService';
import { TOKEN_KEY } from './consts';

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const handleUserResponse = ({ user: { token, ...user } }) => {
  localStorage.setItem(TOKEN_KEY, token);
  return user;
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  return Promise.resolve();
};

const login = async ({ username, password }) => {
  const result = await ApiClientService('login', {
    body: { username, password }
  });
  return handleUserResponse(result);
};

const register = async ({ username, password }) => {
  const result = await ApiClientService('register', {
    body: { username, password }
  });
  return handleUserResponse(result);
};

const getUser = async () => {
  const token = getToken();
  // No user yet.
  if (!token) {
    return Promise.resolve(null);
  }
  // Check with backend to see if key is still valid
  // TODO: Use correct endpoint instead of this dummy endpoint.
  try {
    return ApiClientService('me');
  } catch (error) {
    logout();
    return Promise.reject(error);
  }
};

export default { login, register, logout, getToken, getUser };
