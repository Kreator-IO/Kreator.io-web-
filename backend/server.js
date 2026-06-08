import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import config from './config/index.js';
import connectDB from './config/database.js';

// Route imports
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import leadRoutes from './routes/leads.js';
import projectRoutes from './routes/projects.js';
import userRoutes from './routes/users.js';
import healthRoutes from './routes/health.js';
import taskRoutes from './routes/tasks.js';
import aiRoutes from './routes/ai.js';
import appointmentRoutes from './routes/appointments.js';
import commRoutes from './routes/communications.js';
import billingRoutes from './routes/billing.js';

const app = express();
let server;

// Connect to database
if (config.env !== 'test') {
  connectDB().catch((error) => {
    console.error(`Database startup failed: ${error.message}`);
  });
}

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || config.corsOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Logging
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Body parsing with limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/communications', commRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api', contactRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = config.env === 'development' ? err.message : 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    stack: config.env === 'development' ? err.stack : undefined
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully.`);
  if (server) {
    server.close(() => process.exit(0));
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// For testing purposes
export default app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = config.port;
  server = app.listen(PORT, () => {
    console.log(`Server running in ${config.env} mode on port ${PORT}`);
  });
}
