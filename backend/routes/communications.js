import express from 'express';
import CallLog from '../models/CallLog.js';
import Conversation from '../models/Conversation.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

// GET /api/communications/calls
router.get('/calls', async (req, res) => {
  try {
    const calls = await CallLog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: calls });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// GET /api/communications/whatsapp
router.get('/whatsapp', async (req, res) => {
  try {
    const conversations = await Conversation.find({ channel: 'whatsapp' }).sort({ updatedAt: -1 });
    res.json({ success: true, data: conversations });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// POST /api/communications/email
router.post('/email', async (req, res) => {
  // Mock sending email
  res.json({ success: true, message: 'Email queued for delivery' });
});

export default router;
