import { TOKEN_KEY } from './consts';

const ApiClientService = async (endpoint, { body, ...customConfig } = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = { 'content-type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(`${process.env.REACT_APP_BACKEND_API}${endpoint}`, config);
};

export default ApiClientService;
