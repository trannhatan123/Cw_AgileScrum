// src/services/analyticsService.js
import apiClient from './apiClient';

export const getAnalyticsStats     = () => apiClient.get('/admin/analytics/stats');
export const getPopular            = (type, limit=5) =>
  apiClient.get('/admin/analytics/popular', { params: { type, limit } });
export const getQuizCompletionRate = (quizId) =>
  apiClient.get('/admin/analytics/quiz-completion', { params: { quizId } });