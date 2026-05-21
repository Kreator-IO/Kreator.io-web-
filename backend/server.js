import dotenv from 'dotenv';
import dns from 'dns';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import contactRouter from './routes/contact.js';
import authRoutes from './routes/auth.js';

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', contactRouter);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Routes
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
}

export default app;