import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
})

console.log('API baseURL:', API.defaults.baseURL);
console.log('REACT_APP_API_URL env:', process.env.REACT_APP_API_URL);

API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    console.log('Request to:', config.baseURL + config.url);
    console.log('Token present:', !!token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

API.interceptors.response.use(
    response => {
        console.log('Response received:', response.status, response.data);
        return response;
    },
    error => {
        console.error('Response error:', error.response?.status, error.message);
        return Promise.reject(error);
    }
)

export default API; 