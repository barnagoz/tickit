/* eslint-disable vars-on-top */
const express = require('express');
const signale = require('signale');
const { substring } = require('../utils/index');
const db = require('../db');
const Queries = require('../query_strings');

const router = express.Router();

router.post('/getUserGroups', async (req, res) => {
  // loginToken
  try {
    const goodToken = substring(req.body.loginToken);
    const user = await db.query(Queries.select_with_where('Users', 'loginToken', goodToken));
    if (!user[0].id) {
      res.status(401).send('No user found!!');
      return;
    }
    const groups = await db.query(Queries.select_with_where_num('`Group`', 'users_id', user[0].id));
    res.status(200).send(groups);
  } catch (e) {
    signale.fatal('Error in /group/getUserGroups');
  }
});

router.post('/addReportToGroup', async (req, res) => {
  // reportId, groupId, loginToken
  try {
    await db.query(Queries.change_groupid(req.body.reportId, req.body.groupId));
    res.status(200).send('OK');
  } catch (e) {
    signale.fatal('Error in /group/addReportToGroup:', e);
  }
});

router.post('/saveGroups', async (req, res) => {
  // loginToken, groups (array: name, color)
  try {
    const goodToken = substring(req.body.loginToken);
    const user = await db.query(Queries.select_with_where('Users', 'loginToken', goodToken));
    if (!user) {
      res.status(401).send('Something went wrong with your login token. Please try again.');
      return;
    }
    // eslint-disable-next-line no-var
    var IDs = [];
    await Promise.all(
      req.body.groups.map(async (element, index) => {
        if (typeof req.body.groups[index].id !== 'undefined') {
          await db.query(Queries.updateGroup(element.name, element.color, element.id));
          IDs.push(element.id);
          console.log('Updated element:', element.id);
        } else {
          const newGroup = await db.query(
            Queries.addGroup(element.name, element.color, user[0].id),
          );
          IDs.push(newGroup.insertId);
          console.log('Added group:', newGroup.insertId);
        }
        console.log(IDs);
      }),
    );
    const allGroups = await db.query(
      Queries.select_with_where_for_group_num('users_id', user[0].id),
    );
    const ungroupedID = allGroups.find((element) => element.name === 'Ungrouped').id;
    Promise.all(
      allGroups.map(async (element) => {
        if (IDs.includes(element.id) === false) {
          console.log('Delete:', element.id, IDs);
          await db.query(Queries.updateReportGroup(element.id, ungroupedID));
          await db.query(Queries.deleteGroups(element.id));
        }
      }),
    );
    res.status(200).send('Done!');
  } catch (e) {
    signale.fatal('Error in /group/saveGroups:', e);
  }
});

module.exports = router;
