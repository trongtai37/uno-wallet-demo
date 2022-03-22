import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const axiosInstance = axios.create({
  baseURL: `${baseURL}/api/v1`,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || '';
    (config.headers || {})['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);
