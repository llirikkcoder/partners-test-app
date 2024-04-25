import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  // ... другие настройки, например, заголовки
});

export default apiClient;