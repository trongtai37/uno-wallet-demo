import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);
