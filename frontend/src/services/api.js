import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8000/api/'  // Para desarrollo
    : '/api/',                      // Para producción
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;