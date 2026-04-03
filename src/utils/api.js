import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://69.62.83.21:3010/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT on every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login', data),
};

// Documents
export const docsAPI = {
  upload: (formData) =>
    api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000,
    }),
  getAll:       ()   => api.get('/documents'),
  getOne:       (id) => api.get(`/documents/${id}`),
  getAnalysis:  (id) => api.get(`/documents/${id}/analysis`),
  getCertificate:(id)=> api.get(`/documents/${id}/certificate`),
  analyze:      (id) => api.post(`/documents/${id}/analyze`),
  chat:         (id, message) => api.post(`/documents/${id}/chat`, { message }),
};

export default api;
