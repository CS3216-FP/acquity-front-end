import axios from 'axios';
import applyConverters from 'axios-case-converter';
import tokenUtils from 'utils/tokenUtils';

export const { CancelToken } = axios;

const ApiService = applyConverters(
  axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    headers: { 'Content-Type': 'application/json' }
  })
);

ApiService.interceptors.request.use(
  config => {
    const token = tokenUtils.getToken();
    // eslint-disable-next-line no-param-reassign
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default ApiService;
