import { jest } from '@jest/globals';
import request from 'supertest';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-for-auth-suite';
process.env.CORS_ORIGIN = 'http://localhost:5173';

const mockUsers = new Map();

const makeUser = (overrides = {}) => ({
  _id: overrides._id || 'mock-user-id',
  id: overrides._id || 'mock-user-id',
  name: overrides.name || 'Test User',
  email: overrides.email || 'test@example.com',
  role: overrides.role || 'Client',
  isActive: overrides.isActive ?? true,
  emailVerified: false,
  refreshToken: overrides.refreshToken,
  save: jest.fn(async function save() {
    mockUsers.set(this.email, this);
    return this;
  }),
  matchPassword: jest.fn(async (password) => password === 'Password123'),
});

jest.unstable_mockModule('../models/User.js', () => ({
  default: {
    findOne: jest.fn((query) => {
      const user = mockUsers.get(query.email);
      return user
        ? {
            select: jest.fn(async () => user),
            ...user,
          }
        : null;
    }),
    findById: jest.fn((id) => ({
      select: jest.fn(async () => [...mockUsers.values()].find((user) => user._id === id) || null),
    })),
    findByIdAndUpdate: jest.fn(async () => null),
    create: jest.fn(async (payload) => {
      const user = makeUser(payload);
      mockUsers.set(user.email, user);
      return user;
    }),
  },
}));

const { default: app } = await import('../server.js');

describe('Authentication routes', () => {
  beforeEach(() => {
    mockUsers.clear();
  });

  test('registers a new client user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'new@example.com',
      password: 'Password123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.role).toBe('Client');
  });

  test('logs in with valid credentials', async () => {
    mockUsers.set('test@example.com', makeUser());

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.email).toBe('test@example.com');
  });

  test('verifies a valid access token', async () => {
    mockUsers.set('test@example.com', makeUser());

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Password123',
    });

    const res = await request(app)
      .get('/api/auth/verify-token')
      .set('Authorization', `Bearer ${loginRes.body.accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe('test@example.com');
  });
});
