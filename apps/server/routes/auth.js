const express = require('express');

const router = express.Router();
const nodemailer = require('nodemailer');

const signale = require('signale');
const Cryptr = require('../cryptr');
const Queries = require('../query_strings');
const db = require('../db');
const emailTemp = require('../public/emailTemplates');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'goozbarnabas@gmail.com',
    pass: 'rhjsriraluaiheuo', // naturally, replace both with your real credentials or an application-specific password
  },
});

router.post('/register', async (req, res) => {
  try {
    const encPass = await Cryptr.encPass(req.body.password);
    const en = req.body.email_notification === 'on';
    const newUser = await db.query(
      Queries.insert_into_add_new_user(req.body.username, encPass, req.body.email, en),
    );
    await db.query(Queries.addGroup('Ungrouped', '#000000', newUser.insertId));
    const newPage = await db.query(Queries.addPage(req.body.username, newUser.insertId));
    await db.query(Queries.addField(newPage.insertId));
    res.status(200).send('Successfully created the user!');
  } catch (e) {
    res.status(501).send('Error with the server!');
    signale.fatal('Error in /auth/register', e);
  }
});

router.post('/login', async (request, response) => {
  // username, password
  try {
    const data = await db.query(Queries.get_user_by_username(request.body.username));
    if (data.length === 0) {
      response.status(401).send('There is no user found with that username!');
      return;
    }
    const decPass = Cryptr.decPass(data[0].password);
    if (decPass !== request.body.password) {
      response.status(402).send('The password is not working!');
      return;
    }
    const token = Cryptr.encToken(`${data[0].username}!!!$$$!!!${Date.now()}`);
    await db.query(Queries.add_data_to_anyToken(data[0].username, 'loginToken', token));
    response.status(200).send(token);
  } catch (e) {
    signale.fatal('Error in /auth/login', e);
  }
});

router.post('/forgotPassword', async (request, response) => {
  // username, email_address
  try {
    const data = await db.query(Queries.get_user_by_username(request.body.username));
    if (data.length === 0) {
      response.status(401).send('There is no user found with that username!');
      return;
    }
    if (data[0].email !== request.body.email_address) {
      response.status(401).send('The email addresses are not matching!');
      return;
    }
    await db.query(Queries.null_token(data[0].username, 'loginToken'));
    const token = await Cryptr.encToken(request.body.email_address + Date.now());
    await db.query(Queries.add_data_to_anyToken(data[0].username, 'resetPassToken', token));
    const mailOptions = {
      from: 'goozbarnabas@gmail.com',
      to: request.body.email_address,
      subject: 'TickIt - Password reset',
      html: emailTemp.password_reset(
        data[0].username,
        `${process.env.URL}/password-reset/${token}`,
      ),
    };
    await transporter.sendMail(mailOptions);
    response.status(200).send('We have sent you an e-mail! Please check your inbox!');
  } catch (e) {
    signale.fatal('Error in /auth/forgotPassword', e);
    response.status(501).send('You made the server crash!');
  }
});

router.post('/changePassword', async (request, response) => {
  // username, token, passowrd

  try {
    const data = await db.query(Queries.get_user_by_username(request.body.username));
    if (data.length === 0) {
      response.status(401).send('There is no user found with that username!');
      return;
    }
    if (data[0].resetPassToken !== request.body.token) {
      response.status(401).send('The token is not good!');
      return;
    }
    const encPass = await Cryptr.encPass(request.body.password);

    await db.query(Queries.change_password(request.body.username, encPass));
    await db.query(Queries.null_token(data[0].username, 'resetPassToken'));
    response.status(200).send('Successfully changed the password!');
  } catch (e) {
    response.status(501).send('You made the server crash!');
    signale.fatal('Error in /auth/changePassword', e);
  }
});

module.exports = router;
