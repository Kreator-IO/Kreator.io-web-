import express from 'express';
import Joi from 'joi';
import Appointment from '../models/Appointment.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

const objectId = Joi.string().hex().length(24);
const appointmentSchema = Joi.object({
  title: Joi.string().trim().required(),
  leadId: objectId.allow('', null),
  clientId: objectId.allow('', null),
  assignedTo: objectId.allow('', null),
  date: Joi.date().required(),
  startTime: Joi.string().trim().required(),
  endTime: Joi.string().trim().required(),
  timezone: Joi.string().trim(),
  status: Joi.string().valid('Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'),
  googleCalendarEventId: Joi.string().trim().allow('', null),
  meetingLink: Joi.string().trim().allow('', null),
  notes: Joi.string().allow('', null),
  reminders: Joi.array().items(Joi.object({
    type: Joi.string().valid('email', 'sms', 'whatsapp').required(),
    sentAt: Joi.date().allow(null)
  }))
});

// GET /api/appointments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const filters = {};
    if (req.user.role === 'Client') {
      filters.clientId = req.user._id;
    } else {
      if (req.query.clientId) filters.clientId = req.query.clientId;
      if (req.query.assignedTo) filters.assignedTo = req.query.assignedTo;
      if (req.query.status) filters.status = req.query.status;
    }

    const appointments = await Appointment.find(filters)
      .populate('clientId', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ date: 1, startTime: 1 });

    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// POST /api/appointments - Publicly accessible for booking
router.post('/', validate(appointmentSchema), async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

export default router;
