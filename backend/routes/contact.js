import express from 'express';
import Joi from 'joi';
import escapeHtml from 'escape-html';
import rateLimit from 'express-rate-limit';
import { sendEmail } from '../utils/email.js';
import validate from '../middlewares/validate.js';
import Lead from '../models/Lead.js';
import config from '../config/index.js';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: { success: false, error: 'Too many contact requests. Please try again shortly.' }
});

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('', null),
  company: Joi.string().allow('', null),
  subject: Joi.string().required(),
  message: Joi.string().required()
});

router.post('/contact', contactLimiter, validate(contactSchema), async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    // Sanitize inputs
    const sanitizedMsg = escapeHtml(message).replace(/\n/g, '<br>');
    const sanitizedName = escapeHtml(name);

    // Save as Lead
    await Lead.create({
      name: sanitizedName,
      email: escapeHtml(email),
      phone: escapeHtml(phone || ''),
      company: escapeHtml(company || ''),
      source: 'Website',
      status: 'New',
      notes: [{ text: `Subject: ${escapeHtml(subject)}\nMessage: ${escapeHtml(message)}` }]
    });

    // Send Emails Asynchronously
    const businessHtml = `
      <h2>New Consultation Request</h2>
      <p><strong>Name:</strong> ${sanitizedName}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || 'Not provided')}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${sanitizedMsg}</p>
      <hr>
      <p style="color: #999; font-size: 12px;">Submitted on: ${new Date().toLocaleString()}</p>
    `;

    const clientHtml = `
      <h2>Hello ${sanitizedName.split(' ')[0]},</h2>
      <p>Thank you for reaching out! We've received your consultation request.</p>
      <p><strong>Your Details:</strong></p>
      <ul>
        <li><strong>Subject:</strong> ${escapeHtml(subject)}</li>
      </ul>
      <p>Our team will contact you within 24-48 hours.</p>
      <p>Best regards,<br>VexquorAI Team</p>
    `;

    // Fire and forget emails (simple retry could be added to utils/email.js)
    Promise.allSettled([
      sendEmail({
        email: config.email.businessEmail,
        subject: `New Consultation: ${escapeHtml(subject)}`,
        html: businessHtml,
        replyTo: email
      }),
      sendEmail({
        email,
        subject: 'Consultation Request Received - VexquorAI',
        html: clientHtml
      })
    ]).catch(console.error);

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, error: 'Failed to process request' });
  }
});

export default router;
