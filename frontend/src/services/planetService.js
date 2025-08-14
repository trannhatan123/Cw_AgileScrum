// src/services/planetService.js
import apiClient from './apiClient';

// Consistent naming: alias getPlanets as getAllPlanets
export const getPlanets = () => apiClient.get('/planets');
export const getAllPlanets = getPlanets;
export const getPlanetById    = (id)   => apiClient.get(`/planets/${id}`);
export const getPlanetBySlug  = (slug) => apiClient.get(`/planets/slug/${slug}`);
export const getPlanetExploration = (slug) => apiClient.get(`/planets/slug/${slug}/exploration`);
export const getPlanetResources   = (slug) => apiClient.get(`/planets/slug/${slug}/resources`);
export const getPlanetNews        = (slug) => apiClient.get(`/planets/slug/${slug}/news`);
export const getHighlights = (slug) => apiClient.get(`/planets/slug/${slug}/highlights`);
export const getPlanetGallery     = (slug) => apiClient.get(`/planets/slug/${slug}/gallery`);
export const createPlanet = (data) => apiClient.post('/planets', data);
export const updatePlanet = (id, data) => apiClient.put(`/planets/${id}`, data);
export const deletePlanet = (id) => apiClient.delete(`/planets/${id}`);
