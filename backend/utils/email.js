import nodemailer from 'nodemailer';
import config from '../config/index.js';

let transporter;

const getTransporter = () => {
  if (!config.email.user || !config.email.password) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
  }

  return transporter;
};

export const sendEmail = async (options) => {
  const mailer = getTransporter();
  if (!mailer) {
    console.warn('Email credentials are not configured. Skipping email send.');
    return false;
  }

  const mailOptions = {
    from: config.email.user,
    to: options.email,
    subject: options.subject,
    text: options.text,
    html: options.html,
    replyTo: options.replyTo
  };

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const info = await mailer.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return true;
    } catch (error) {
      console.error(`Email send attempt ${attempt} failed: ${error.message}`);
      if (attempt < 3) {
        await new Promise(resolve => setTimeout(resolve, attempt * 750));
      }
    }
  }

  return false;
};
