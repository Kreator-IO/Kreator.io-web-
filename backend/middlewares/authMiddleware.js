import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    const decoded = verifyToken(token);
    
    if (!decoded || decoded.type === 'refresh') {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    const user = await User.findById(decoded.id).select('-password -refreshToken -resetPasswordToken');

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, error: 'User account is deactivated' });
    }

    req.user = user;
    next();
  } catch (err) {
    const error = err.name === 'TokenExpiredError' ? 'Token expired' : 'Not authorized to access this route';
    return res.status(401).json({ success: false, error });
  }
};

export default authMiddleware;
