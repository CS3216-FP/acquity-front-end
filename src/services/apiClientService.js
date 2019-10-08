import axios from 'axios';
import TokenUtils from 'utils/tokenUtils';

const ApiClientService = async (endpoint, { data, ...customConfig } = {}) => {
  const token = TokenUtils.getToken();
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
