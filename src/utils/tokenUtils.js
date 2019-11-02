export const TOKEN_KEY = 'accessToken';

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const storeToken = response => {
  if (response.status === 200) {
    localStorage.setItem(TOKEN_KEY, response.data[TOKEN_KEY]);
    return Promise.resolve(null);
  }
  return Promise.reject(new Error(response.statusText));
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export default { getToken, storeToken, removeToken };
