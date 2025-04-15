import axios from 'axios';

// Detección automática del entorno
const isCodespaces = process.env.REACT_APP_CODESPACES === 'true';
const isDocker = process.env.REACT_APP_DOCKER === 'true';

let baseURL;

if (isCodespaces) {
  // Usa la variable de entorno que GitHub Codespaces provee
  baseURL = process.env.REACT_APP_BACKEND_URL || 
            `https://${window.location.hostname.replace('3000', '8000')}`;
} else if (isDocker) {
  baseURL = 'http://backend:8000';
} else {
  baseURL = 'http://localhost:8000';
}

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 
           `https://${window.location.hostname.replace('3000', '8000')}`,
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Timeout: El backend no respondió a tiempo';
    }
    return Promise.reject(error);
  }
);

export default api;