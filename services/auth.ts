import { axiosInstance } from './axiosInstance';

export const logIn = async () => {
  return await axiosInstance.get('/login');
};

export const logOut = async () => {
  return await axiosInstance.post('/logout');
};
