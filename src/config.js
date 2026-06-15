const config = {
  apiUrl: import.meta.env.VITE_API_URL || (import.meta.env.DEV
    ? 'http://localhost:5000/api'
    : 'https://kreater-backend.onrender.com/api'),
};

export default config;
