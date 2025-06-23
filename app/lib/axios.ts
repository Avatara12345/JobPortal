// lib/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://job-portal-rp7w.onrender.com/api',
});

export default api;
