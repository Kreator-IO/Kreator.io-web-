const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Mock the User model so tests don't require a running MongoDB instance
jest.mock('../models/User', () => {
  const mockUserInstance = {
    save: jest.fn().mockResolvedValue(true),
    email: 'test@example.com',
    password: 'hashedpassword',
    role: 'Client',
    _id: 'mockuserid'
  };
  
  const mockUserClass = jest.fn().mockImplementation(() => mockUserInstance);
  mockUserClass.findOne = jest.fn().mockImplementation(async ({ email }) => {
    if (email === 'test@example.com') {
      return {
        _id: 'mockuserid',
        email: 'test@example.com',
        password: await require('bcrypt').hash('password123', 10),
        role: 'Client',
        save: jest.fn().mockResolvedValue(true)
      };
    }
    return null;
  });
  
  return mockUserClass;
});

describe('Authentication Tests', () => {
  test('Register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
      role: 'Client',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  test('Login with valid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('Access protected route with valid token', async () => {
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/auth/dashboard')
      .set('Authorization', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('Client dashboard');
  });
});