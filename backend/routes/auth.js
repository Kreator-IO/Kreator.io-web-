import express from 'express';
import Joi from 'joi';
import crypto from 'crypto';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, verifyToken, blacklistToken } from '../utils/jwt.js';
import validate from '../middlewares/validate.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80).required(),
  email: Joi.string().email().required(),
  role: Joi.forbidden().messages({
    'any.unknown': 'Role cannot be set during registration'
  }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must include uppercase, lowercase, and a number'
    })
}).unknown(false);

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: registerSchema.extract('password')
});

const profileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80),
  phone: Joi.string().trim().max(30).allow('', null),
  company: Joi.string().trim().max(120).allow('', null),
  avatar: Joi.string().uri().allow('', null)
}).min(1);

const getBearerToken = (req) => {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
};

const getCookie = (req, name) => {
  const cookies = req.headers.cookie?.split(';').map(cookie => cookie.trim()) || [];
  const match = cookies.find(cookie => cookie.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null;
};

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  company: user.company,
  avatar: user.avatar,
  emailVerified: user.emailVerified,
});

const issueTokens = async (res, user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { accessToken, refreshToken };
};

// Register
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    // Create user with default Client role
    const user = await User.create({ name, email, password, role: 'Client' });
    
    const tokens = await issueTokens(res, user);
    res.status(201).json({ 
      success: true, 
      token: tokens.accessToken,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: publicUser(user)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Login
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    user.lastLogin = Date.now();
    await user.save();

    const tokens = await issueTokens(res, user);
    res.json({ 
      success: true, 
      token: tokens.accessToken,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: publicUser(user)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// Get Current User (Me)
router.get('/me', authMiddleware, async (req, res) => {
  res.json({ success: true, user: publicUser(req.user) });
});

router.get('/verify-token', authMiddleware, async (req, res) => {
  res.json({ success: true, user: publicUser(req.user) });
});

router.put('/profile', authMiddleware, validate(profileSchema), async (req, res) => {
  const allowed = ['name', 'phone', 'company', 'avatar'];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) req.user[field] = req.body[field];
  });
  await req.user.save();
  res.json({ success: true, user: publicUser(req.user) });
});

router.post('/refresh', async (req, res) => {
  const refreshToken = req.body.refreshToken || getCookie(req, 'refreshToken');
  if (!refreshToken) {
    return res.status(401).json({ success: false, error: 'Refresh token required' });
  }

  const decoded = verifyToken(refreshToken);
  if (!decoded || decoded.type !== 'refresh') {
    return res.status(401).json({ success: false, error: 'Invalid refresh token' });
  }

  const user = await User.findById(decoded.id).select('+refreshToken');
  if (!user || user.refreshToken !== refreshToken || !user.isActive) {
    return res.status(401).json({ success: false, error: 'Invalid refresh token' });
  }

  blacklistToken(refreshToken);
  const tokens = await issueTokens(res, user);
  res.json({
    success: true,
    token: tokens.accessToken,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: publicUser(user)
  });
});

router.post('/forgot-password', validate(forgotPasswordSchema), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save();

    await sendEmail({
      email: user.email,
      subject: 'Reset your VexquorAI password',
      text: `Use this reset token within 1 hour: ${rawToken}`,
      html: `<p>Use this reset token within 1 hour:</p><p><strong>${rawToken}</strong></p>`
    });
  }

  res.json({ success: true, message: 'If that email exists, a reset token has been sent.' });
});

router.post('/reset-password', validate(resetPasswordSchema), async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.body.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }
  }).select('+password');

  if (!user) {
    return res.status(400).json({ success: false, error: 'Invalid or expired reset token' });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.refreshToken = undefined;
  await user.save();

  res.json({ success: true, message: 'Password reset successfully' });
});

router.post('/logout', authMiddleware, async (req, res) => {
  const token = getBearerToken(req);
  blacklistToken(token);
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: '' } });
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
