const express = require('express');

const router = express.Router();
const nodemailer = require('nodemailer');

const signale = require('signale');
const emailTemp = require('../public/emailTemplates');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'goozbarnabas@gmail.com',
    pass: 'rhjsriraluaiheuo', // naturally, replace both with your real credentials or an application-specific password
  },
});

router.post('/contact', (req, res) => {
  // name, email, message
  try {
    const mailOptions = {
      from: 'goozbarnabas@gmail.com',
      to: 'goozbarnabas@gmail.com',
      subject: 'TickIt - Contact form submission',
      html: emailTemp.contact_form(req.body.name, req.body.email, req.body.message),
    };
    transporter.sendMail(mailOptions);
    res.status(200).send('E-mail sent!');
  } catch (e) {
    signale.fatal('Error in /general/contact: ', e);
  }
});

router.post('/keep-alive', (req, res) => {
  res.status(200).send("Now I'm alive");
});

module.exports = router;
