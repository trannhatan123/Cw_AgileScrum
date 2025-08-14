// backend/services/emailjsMailer.js
const axios = require('axios');

async function sendEmail({ to, templateParams }) {
  const payload = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_USER_ID,
    accessToken: process.env.EMAILJS_ACCESS_TOKEN,   // Private Key
    template_params: {
      to_email: to,
      ...templateParams
    }
  };

  console.log('[EmailJS] payload =', JSON.stringify(payload, null, 2));
  // Gửi request
  const res = await axios.post(
    'https://api.emailjs.com/api/v1.0/email/send',
    payload
  );
  console.log('[EmailJS] status =', res.status);
}

module.exports = { sendEmail };
