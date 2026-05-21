import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

router.post('/contact', async (req, res) => {
    try {
        const { name, email, phone, company, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
            });
        }

        const businessEmailContent = `
      <h2>New Consultation Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color: #999; font-size: 12px;">Submitted on: ${new Date().toLocaleString()}</p>
    `;

        const clientEmailContent = `
      <h2>Hello ${name.split(' ')[0]},</h2>
      <p>Thank you for reaching out! We've received your consultation request.</p>
      <p><strong>Your Details:</strong></p>
      <ul>
        <li><strong>Subject:</strong> ${subject}</li>
        <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
        <li><strong>Company:</strong> ${company || 'Not provided'}</li>
      </ul>
      <p>Our team will contact you within 24-48 hours.</p>
      <p>Best regards,<br>Kreator IO Team</p>
    `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.BUSINESS_EMAIL,
            subject: `New Consultation: ${subject}`,
            html: businessEmailContent,
            replyTo: email,
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Consultation Request Received - Kreator IO',
            html: clientEmailContent,
        });

        res.status(200).json({
            success: true,
            message: 'Email sent successfully',
        });

    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send email',
        });
    }
});

export default router;