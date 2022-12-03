const express = require('express');
const signale = require('signale');
const db = require('../db');
const Queries = require('../query_strings');
const { substring } = require('../utils');

const router = express.Router();

router.post('/getPageData', async (req, res) => {
  // link
  try {
    const page = await db.query(Queries.getEveryInputFieldForPage(req.body.link));
    if (page.length === 0) {
      res.status(404).send('No page found!');
      return;
    }
    res.status(200).send(page);
  } catch (e) {
    signale.fatal('Error in /page/getPageData:', e);
  }
});

router.post('/submitReportData', async (req, res) => {
  try {
    const page = await db.query(Queries.select_with_where('Pages', 'link_slug', req.body.pageID));
    const group = await db.query(
      Queries.select_with_where_for_group_2('users_id', page[0].users_id, 'name', 'Ungrouped'),
    );
    const report = await db.query(
      Queries.addNewReport(page[0].users_id, req.body.email, group[0].id),
    );
    await Promise.all(
      req.body.responses.map(async (element) => {
        await db.query(
          Queries.addNewInput(element.fiel, element.resp, report.insertId, element.num),
        );
      }),
    );
    res.status(200).send('Report submitted!');
  } catch (e) {
    signale.fatal('Error in /page/submitReportData:', e);
  }
});

router.post('/getPageSettings', async (req, res) => {
  // loginToken
  try {
    const goodToken = substring(req.body.loginToken);
    const user = await db.query(Queries.select_with_where('Users', 'loginToken', goodToken));
    if (!user) {
      res.status(401).send('No user found!!!');
      return;
    }
    const page = await db.query(Queries.select_with_where_num('Pages', 'users_id', user[0].id));
    if (!page) {
      res.status(404).send('No page found!!!');
    }
    const fields = await db.query(Queries.getEveryInputFieldForPage(page[0].link_slug));
    const pageSettings = { page, fields };
    res.status(200).send(pageSettings);
  } catch (e) {
    signale.fatal('Error in /page/getPageSetting:', e);
  }
});

router.post('/savePageSettings', async (req, res) => {
  // pagesetting(arr) field(arr) loginToken
  try {
    const goodToken = substring(req.body.loginToken);
    const user = await db.query(Queries.select_with_where('Users', 'loginToken', goodToken));
    // check if user is existing!
    await db.query(
      Queries.changePageData(
        req.body.pagesettings.page_title,
        req.body.pagesettings.subheading,
        req.body.pagesettings.background,
        req.body.pagesettings.color_scheme,
        req.body.pagesettings.link_slug,
        user[0].id,
      ),
    );
    const page = await db.query(Queries.select_with_where('Pages', 'users_id', user[0].id));
    await db.query(Queries.delete_inputfields(page[0].id));
    req.body.fieldsettings.forEach((element) => {
      db.query(
        Queries.addFieldWithData(element.type, element.placeholder, page[0].id, element.number),
      );
    });
    res.status(200).send('OK');
  } catch (e) {
    signale.fatal('Error in /page/savePageSettings:', e);
  }
});
module.exports = router;
