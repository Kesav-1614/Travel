import axios from 'axios';
import { getAuthToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:8000/', // ✅ No '/api/' in base URL
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
