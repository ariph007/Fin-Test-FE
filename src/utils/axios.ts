import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import config from '../config/config';




const request = axios.create({
  baseURL: config.API_URL
})

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
     return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default request;