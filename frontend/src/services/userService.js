// src/services/userService.js
import apiClient from './apiClient';

// Get paginated list of users
export const getUsers = (page = 1, limit = 10) =>
  apiClient.get('/users', { params: { page, limit } });

// Get single user by ID
export const getUserById = (id) => apiClient.get(`/users/${id}`);

export const createUser = (data) => apiClient.post('/users', data);

// Update user profile (name, email, role, avatarUrl)
export const updateUser = (id, data) => apiClient.put(`/users/${id}`, data);

// Update user password (admin reset)
export const updateUserPassword = (id, data) =>
  apiClient.put(`/users/${id}/password`, data);

// Delete user
export const deleteUser = (id) => apiClient.delete(`/users/${id}`);

