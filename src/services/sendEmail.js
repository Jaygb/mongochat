const nodemailer = require('nodemailer');
const config = require('../utils/config');

const transport = nodemailer.createTransport({
  service: 'Gmail',
  secure: true,
  port: 465,
  auth: {
    user: config.smtp.email,
    pass: config.smtp.password,
  },
});

const sendEmail = async (email, subject, html) => {
  const mailDetail = {
    to: email,
    subject,
    html,
  };

  try {
    const response = await transport.sendMail(mailDetail);
    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
