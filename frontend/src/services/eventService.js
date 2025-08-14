import apiClient from './apiClient';

export const getAllEvents   = () => apiClient.get('/events');
export const getEventById   = id => apiClient.get(`/events/${id}`);
export const createEvent    = data => apiClient.post('/events', data);
export const updateEvent    = (id, data) => apiClient.put(`/events/${id}`, data);
export const deleteEvent    = id => apiClient.delete(`/events/${id}`);
