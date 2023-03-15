import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

export const mainAxios = axios.create({
  baseURL: 'http://localhost:3002/',
});

mainAxios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = token;
  return config;
});
