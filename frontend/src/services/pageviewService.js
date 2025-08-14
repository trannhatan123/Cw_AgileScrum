// 2a. src/services/pageviewService.js
import apiClient from './apiClient';

export const getPageviewStats = (period='daily') =>
  apiClient.get('/admin/analytics/pageviews', { params: { period } });