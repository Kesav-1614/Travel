import axios from 'axios';

const API_URL = 'http://localhost:8000';

// ✅ Create an axios instance
const api = axios.create({
  baseURL: API_URL,
});

// ✅ Automatically attach Bearer token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = async (data) => {
  try {
    const response = await api.post('/register/', data);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw error;
  }
};

export const login = async (data, navigate) => {
  try {
    const response = await api.post('/login/', data);
    const { access_token, is_staff } = response.data;

    // ✅ Save token and staff status in localStorage
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('isStaff', is_staff ? 'true' : 'false');

    console.log('Login Successful:', is_staff);

    // ✅ Redirect based on user role
    navigate(is_staff ? '/admin-dashboard' : '/dashboard');
  } catch (error) {
    console.error('Login failed:', error.response?.data?.error || error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('isStaff');

  // ✅ Use navigate to avoid full reload
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  const isStaff = localStorage.getItem('isStaff') === 'true';

  console.log('Auth check - Authenticated:', !!token, 'Is Staff:', isStaff);

  return {
    authenticated: !!token,
    isStaff,
  };
};

// ✅ Fetch user profile (Example using interceptor)
export const getProfile = async () => {
  try {
    const response = await api.get('/profile/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Example: Fetch travel request details
export const getTravelRequest = async (id) => {
  try {
    const response = await api.get(`/travel-requests/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch travel request:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Example: Submit a travel request
export const createTravelRequest = async (data) => {
  try {
    const response = await api.post('/travel-requests/', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create travel request:', error.response?.data || error.message);
    throw error;
  }
};
