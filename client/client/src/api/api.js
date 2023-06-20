import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Replace with your server URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = (userData) => {
  return api.post('/register', userData);
};

export const loginUser = (userData) => {
  return api.post('/login', userData);
};
export const logoutUser = () => {
  return api.post('/logout');
};

export const updateProfile = (userId, userData) => {
  return api.put(`/profile/${userId}`, userData);
};

export const changePassword = (userId, passwordData) => {
  return api.put(`/change-password/${userId}`, passwordData);
};

export const deleteAccount = (userId) => {
  return api.delete(`/account/${userId}`);
};
