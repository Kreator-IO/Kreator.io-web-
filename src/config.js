const config = {
  apiUrl: import.meta.env.VITE_API_URL || (import.meta.env.DEV
    ? 'http://localhost:5000/api'
    : 'https://kreater-backend.onrender.com/api'),
  recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LdiYyAtAAAAABf10ux3lNcU-rXwIAITKy160RNC',
  recaptchaDevToken: 'dev-recaptcha-token',
};

export default config;
