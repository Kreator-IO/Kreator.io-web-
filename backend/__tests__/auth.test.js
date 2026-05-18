const request = require('supertest');
const app = require('../server'); // Assuming server.js initializes the app
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Authentication Tests', () => {
  test('Register a new user', async () => {
    const res = await request(app).post('/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
      role: 'Client',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  test('Login with valid credentials', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('Access protected route with valid token', async () => {
    const loginRes = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    const token = loginRes.body.token;

    const res = await request(app)
      .get('/auth/dashboard')
      .set('Authorization', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('Client dashboard');
  });
});