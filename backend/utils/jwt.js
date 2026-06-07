import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const blacklistedTokens = new Map();

const pruneBlacklist = () => {
  const now = Date.now();
  for (const [token, expiresAt] of blacklistedTokens.entries()) {
    if (expiresAt <= now) blacklistedTokens.delete(token);
  }
};

export const generateAccessToken = (user) => {
  const userId = user._id || user.id || user;
  const role = user.role;
  return jwt.sign({ id: userId, role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export const generateRefreshToken = (user) => {
  const userId = user._id || user.id || user;
  return jwt.sign({ id: userId, type: 'refresh' }, config.jwt.secret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });
};

export const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export const verifyToken = (token) => {
  try {
    if (isTokenBlacklisted(token)) return null;
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    return null;
  }
};

export const blacklistToken = (token) => {
  if (!token) return;
  pruneBlacklist();
  try {
    const decoded = jwt.decode(token);
    const expiresAt = decoded?.exp ? decoded.exp * 1000 : Date.now() + 60 * 60 * 1000;
    blacklistedTokens.set(token, expiresAt);
  } catch {
    blacklistedTokens.set(token, Date.now() + 60 * 60 * 1000);
  }
};

export const isTokenBlacklisted = (token) => {
  pruneBlacklist();
  return blacklistedTokens.has(token);
};
