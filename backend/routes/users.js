import express from 'express';
import Joi from 'joi';
import User from '../models/User.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80),
  phone: Joi.string().trim().max(30).allow('', null),
  company: Joi.string().trim().max(120).allow('', null),
  avatar: Joi.string().uri().allow('', null),
  isActive: Joi.boolean()
}).min(1);

const roleSchema = Joi.object({
  role: Joi.string().valid('Admin', 'Manager', 'Client', 'Team').required()
});

// Apply auth middleware to all user routes
router.use(authMiddleware);

// Get all users (Admin only)
router.get('/', roleMiddleware('Admin'), async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const isSelf = req.user._id.toString() === req.params.id;
    if (!isSelf && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

router.put('/:id', validate(updateUserSchema), async (req, res) => {
  try {
    const isSelf = req.user._id.toString() === req.params.id;
    if (!isSelf && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    const payload = { ...req.body };
    if (req.user.role !== 'Admin') delete payload.isActive;

    const user = await User.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

router.delete('/:id', roleMiddleware('Admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    res.json({ success: true, message: 'User deactivated', data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// Update user role (Admin only)
router.put('/:id/role', roleMiddleware('Admin'), validate(roleSchema), async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true });
    
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

export default router;
