const express = require('express');
const signale = require('signale');
const { substring } = require('../utils');

const router = express.Router();

const db = require('../db');
const Queries = require('../query_strings');

router.post('/deleteReport', async (req, res) => {
  // loginToken, reportID
  try {
    if (!req.body.loginToken) {
      res.status(400).send('No loginToken!!!');
      return;
    }
    const loginToken = req.body.loginToken.split('"').join('');
    const user = await db.query(Queries.select_with_where('Users', 'loginToken', loginToken));
    const report = await db.query(Queries.select_with_where('Report', 'id', req.body.reportID));
    if (user.id !== report.users_id) {
      res.status(401).send('No access granted!');
      return;
    }
    const inputdel = await db.query(Queries.deleteInputs(req.body.reportID));
    console.log(inputdel);
    const reportdel = await db.query(Queries.deleteReport(req.body.reportID));
    console.log(reportdel);
    res.status(200).send('Successfully deleted report!');
  } catch (e) {
    signale.fatal('Error in /reports/deleteReport', e);
  }
});

router.post('/getUserReports', async (req, res) => {
  // loginToken
  try {
    if (!req.body.loginToken) {
      res.status(400).send('No loginToken!!!');
      return;
    }
    const loginToken = req.body.loginToken.split('"').join('');
    const userid = await db.query(Queries.select_with_where('Users', 'loginToken', loginToken));
    const reports = await db.query(Queries.getEveryReportForUser(userid[0].id));
    res.status(200).send(reports);
  } catch (e) {
    signale.fatal('Error in /reports/getUserReports: ', e);
  }
});

router.post('/getReportData', async (req, res) => {
  // loginToken, reportId
  try {
    if (!req.body.loginToken) {
      res.status(400).send('No loginToken!!!');
      return;
    }
    const goodToken = substring(req.body.loginToken);
    const user = await db.query(Queries.select_with_where('Users', 'loginToken', goodToken));
    console.log(user);
    if (!user) {
      res.status(401).send('No user found!!!');
      return;
    }
    const report = await db.query(Queries.getReportData(req.body.reportId));
    console.log(report);
    if (!report) {
      res.status(400).send('No report found!!!');
      return;
    }
    if (report.users_id !== user.id) {
      res.status(401).send('No access!!!');
      return;
    }

    res.status(200).send(report);
  } catch (e) {
    signale.fatal('Error in /reports/getReportData: ', e);
  }
});

module.exports = router;
