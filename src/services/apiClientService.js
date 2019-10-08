import axios from 'axios';
import { TOKEN_KEY } from './consts';

const ApiClientService = async (endpoint, { data, ...customConfig } = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = { 'content-type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: data ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };
  if (data) {
    config.data = data;
  }

  return axios(`${process.env.REACT_APP_BACKEND_API}${endpoint}`, config);
};

export default ApiClientService;
