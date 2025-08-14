// backend/services/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  secure: true, // SSL/TLS cho port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP ngay khi khởi động
transporter.verify(err => {
  if (err) {
    console.error('[Mailer] SMTP connection error:', err);
  } else {
    console.log('[Mailer] SMTP server is ready to send messages');
  }
});

async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    console.log('[Mailer] Email sent:', info.messageId);
    return info;
  } catch (err) {
    console.error('[Mailer] Error sending email to', to, '\n', err);
    // Gói lỗi gọn lại để controller dễ phân biệt
    throw new Error(`MailerError: ${err.message}`);
  }
}

module.exports = { sendEmail };
