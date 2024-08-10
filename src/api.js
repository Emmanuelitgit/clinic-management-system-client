import axios from 'axios';

const api = axios.create({
  baseURL: 'https://clinic-server-o79p.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;