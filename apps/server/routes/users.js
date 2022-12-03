const express = require('express');

const router = express.Router();
const signale = require('signale');
const db = require('../db');
const Queries = require('../query_strings');
const Cryptr = require('../cryptr');
const { substring } = require('../utils/index');

router.post('/getUserDetails', async (req, res) => {
  // loginToken
  try {
    const token = substring(req.body.loginToken);
    const user = await db.query(Queries.select_with_where('Users', 'loginToken', token));
    res.status(200).send(user);
  } catch (e) {
    signale.fatal('Error in /users/getUserDetails: ', e);
  }
});

router.post('/onboarding', async (req, res) => {
  // username, page_title, subheading, background, color_scheme, link, input{type, placeholder}
  try {
    const user = await db.query(Queries.get_user_by_username(req.body.username));
    const userid = user[0].id;
    const addNewPage = await db.query(
      Queries.insert_into_add_new_page(
        userid,
        req.body.page_title,
        req.body.subheading,
        req.body.background,
        req.body.color_scheme,
        req.body.link,
      ),
    );
    // eslint-disable-next-line no-restricted-syntax
    for (const element of req.body.input) {
      // eslint-disable-next-line no-await-in-loop
      await db.query(
        Queries.insert_into_add_new_inputfield(
          addNewPage.insertId,
          element.type,
          element.placeholder,
        ),
      );
    }

    res.status(200).send('Everything is saved!');
  } catch (e) {
    res.status(500).send(e);
    signale.fatal('Error in /users/onboarding: ', e);
  }
});

router.post('/pageDataChange', async (req, res) => {
  // username, page_title, subheading, background, color_scheme, input{type, placeholder}
  try {
    const user = await db.query(Queries.get_user_by_username(req.body.username));
    const userid = user[0].id;
    const changePageData = await db.query(
      Queries.change_page(
        userid,
        req.body.page_title,
        req.body.subheading,
        req.body.background,
        req.body.color_scheme,
      ),
    );
    console.log(changePageData);
    const pagesRow = await db.query(Queries.select_with_where('Pages', 'users_id', userid));
    console.log(pagesRow, 'ez a pagesrow!!');
    await db.query(Queries.delete_inputfields(pagesRow[0].id));
    // eslint-disable-next-line no-restricted-syntax
    for (const element of req.body.input) {
      // eslint-disable-next-line no-await-in-loop
      await db.query(
        Queries.insert_into_add_new_inputfield(pagesRow[0].id, element.type, element.placeholder),
      );
    }
    res.status(200).send('Everything is updated!');
  } catch (e) {
    res.status(500).send(e);
    signale.fatal('Error in /users/pageDataChange', e);
  }
});

router.post('/linkChange', async (req, res) => {
  // username, link
  try {
    const user = await db.query(Queries.get_user_by_username(req.body.username));
    const userid = user[0].id;
    await db.query(Queries.change_link(userid, req.body.link));
    res.status(200).send('Successfully changed link!');
  } catch (e) {
    res.status(500).send(e);
    signale.fatal('Error in /users/linkChange:', e);
  }
});

router.post('/getUserSettings', async (req, res) => {
  // loginToken
  try {
    const goodToken = substring(req.body.loginToken);
    const user = await db.query(Queries.select_with_where('Users', 'loginToken', goodToken));
    if (user.length > 0) {
      res.status(200).send(user);
      return;
    }
    res.status(404).send('Error');
  } catch (e) {
    signale.fatal('Error in /users/getUserSettings:', e);
  }
});

router.post('/saveUserSettings', async (req, res) => {
  // loginToken, data
  try {
    console.log(req.body.data);
    const goodToken = substring(req.body.loginToken);
    const user = await db.query(Queries.select_with_where('Users', 'loginToken', goodToken));
    if (user[0].id !== req.body.data.id) {
      res.status(401).send('Big erroro');
      return;
    }
    await db.query(
      Queries.saveUSetting(
        user[0].id,
        req.body.data.username,
        req.body.data.email,
        req.body.data.emailNotifications,
      ),
    );

    res.status(200).send('Alles klar!');
  } catch (e) {
    signale.fatal('Error in /users/saveUserSettings:', e);
  }
});

router.post('/changePass', async (req, res) => {
  // loginToken, oldPass, newPass
  try {
    console.log(req.body);
    const goodToken = substring(req.body.loginToken);
    const user = await db.query(Queries.select_with_where('Users', 'loginToken', goodToken));
    if (!user[0]) {
      res.status(404).send('No user found!!');
      return;
    }
    const decDataPass = await Cryptr.decPass(user[0].password);
    if (decDataPass !== req.body.oldPass) {
      console.log('ENCOLDP:', req.body.oldPass);
      console.log('user[0].password', Cryptr.decPass(user[0].password));
      console.log(decDataPass !== req.body.oldPass);
      res.status(401).send('The old password is incorrect!!');
      return;
    }
    const encNewPass = await Cryptr.encPass(req.body.newPass);
    await db.query(Queries.change_password(user[0].username, encNewPass));
    res.status('200').send('Successfully changed password');
  } catch (e) {
    signale.fatal('Error in /users/changePass:', e);
  }
});

module.exports = router;
