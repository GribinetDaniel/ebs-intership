import axios from "axios";

export const mainAxios = axios.create({
 baseURL: process.env.NEXT_PUBLIC_baseURL,
});
