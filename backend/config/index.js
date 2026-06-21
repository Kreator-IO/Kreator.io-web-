import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const defaultCorsOrigins = ['http://localhost:5173', 'http://localhost:5174'];
const corsOrigins = (process.env.CORS_ORIGIN || defaultCorsOrigins.join(','))
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  mongoUri: process.env.MONGO_URI,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  corsOrigins,
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    businessEmail: process.env.BUSINESS_EMAIL,
  },
  recaptcha: {
    projectId: process.env.RECAPTCHA_PROJECT_ID || 'vexquorai-97e83',
    siteKey: process.env.RECAPTCHA_SITE_KEY || '6LdiYyAtAAAAABf10ux3lNcU-rXwIAITKy160RNC',
    minScore: Number(process.env.RECAPTCHA_MIN_SCORE || 0.5),
    devToken: process.env.RECAPTCHA_DEV_TOKEN || 'dev-recaptcha-token',
  }
};

const requiredFields = ['MONGO_URI', 'JWT_SECRET', 'CORS_ORIGIN'];
const missing = requiredFields.filter(field => !process.env[field]);

if ((isProduction || !isTest) && missing.length > 0) {
  const message = `Missing required environment variables: ${missing.join(', ')}`;
  if (isProduction) {
    console.error(message);
    process.exit(1);
  }
  console.warn(`${message}. Some backend features may not run until configured.`);
}

export default config;
