import axios from 'axios';

import configuration from '../config';

console.log({ configuration });
const axiosInstance = axios.create({
  baseURL: configuration.baseApiURL,
  timeout: 5000,
});

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
