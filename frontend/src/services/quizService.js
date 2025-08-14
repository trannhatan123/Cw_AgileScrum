// src/services/quizService.js
import apiClient from './apiClient';

export const getAllQuizzes = () => apiClient.get('/quizzes');
export const getQuizById = (id) => apiClient.get(`/quizzes/${id}`,
  { params: {}, headers: {} }); // admin endpoint
export const createQuiz = (data) => apiClient.post('/quizzes', data);
export const updateQuiz = (id, data) => apiClient.put(`/quizzes/${id}`, data);
export const deleteQuiz = (id) => apiClient.delete(`/quizzes/${id}`);