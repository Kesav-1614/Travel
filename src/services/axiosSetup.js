import axios from 'axios';
import { getToken, refreshAccessToken, logout } from './auth';

const API_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// ✅ Refresh token if access token expires
axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


export const login = async (data) => {
  const response = await axios.post(`${API_URL}/login/`, data); // Remove extra `/api/`
  const { access, refresh } = response.data;
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
};