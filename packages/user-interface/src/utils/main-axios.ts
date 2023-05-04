import axios from "axios";

export const mainAxios = axios.create({
 baseURL: process.env.REACT_APP_URL,
});

console.log(process.env.REACT_APP_URL);
mainAxios.interceptors.request.use(function (config) {
 const token = localStorage.getItem("token");
 if (token) config.headers.Authorization = token;
 return config;
});
