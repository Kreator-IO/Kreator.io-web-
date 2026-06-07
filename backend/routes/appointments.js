import express from 'express';
import Joi from 'joi';
import Appointment from '../models/Appointment.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// GET /api/appointments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const filters = {};
    if (req.user.role === 'Client') {
      filters.client = req.user._id;
    }

    const appointments = await Appointment.find(filters)
      .populate('client', 'name email')
      .populate('host', 'name email')
      .sort({ startTime: 1 });

    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// POST /api/appointments - Publicly accessible for booking
router.post('/', async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

export default router;
