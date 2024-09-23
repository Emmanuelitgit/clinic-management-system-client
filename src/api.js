import axios from 'axios';

const api = axios.create({
  baseURL: 'https://clinic-server-o79p.onrender.com',
  // baseURL: '  http://localhost:26651',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;