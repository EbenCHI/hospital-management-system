import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Patient APIs
export const patientAPI = {
  getAll: (search = '') => api.get(`/patients${search ? `?search=${search}` : ''}`),
  getById: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data),
  update: (id, data) => api.put(`/patients/${id}`, data),
  delete: (id) => api.delete(`/patients/${id}`),
  getCount: () => api.get('/patients/count'),
};

// Doctor APIs
export const doctorAPI = {
  getAll: () => api.get('/doctors'),
  getById: (id) => api.get(`/doctors/${id}`),
  create: (data) => api.post('/doctors', data),
  update: (id, data) => api.put(`/doctors/${id}`, data),
  delete: (id) => api.delete(`/doctors/${id}`),
  getCount: () => api.get('/doctors/count'),
};

// Appointment APIs
export const appointmentAPI = {
  getAll: () => api.get('/appointments'),
  create: (data) => api.post('/appointments', data),
  delete: (id) => api.delete(`/appointments/${id}`),
  getCount: () => api.get('/appointments/count'),
  getByPatient: (patientId) => api.get(`/appointments/patient/${patientId}`),
  getByDoctor: (doctorId) => api.get(`/appointments/doctor/${doctorId}`),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

export default api;
