import axios from 'axios';

const api = axios.create({
    baseURL: 'https://yasmin-mini-wallet-production.up.railway.app/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Otomatis menyisipkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Menangani Error Handling secara Global
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Jika token mati (401), otomatis logout atau hapus token
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;