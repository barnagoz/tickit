const signale = require('signale');
const Cryptr = require('../cryptr');

require('dotenv').config();

const Queries = require('../query_strings');
const db = require('../db');
const { substring } = require('../utils');

module.exports.tokenValidator = async (req, res, next) => {
  // loginToken
  try {
    if (!req.body.loginToken) {
      res.status(401).send('No user found!');
      return;
    }
    const goodToken = substring(req.body.loginToken);
    const decToken = await Cryptr.decToken(goodToken);
    const decUser = decToken.split('!!!$$$!!!')[0];
    const data2 = await db.query(Queries.get_user_by_username(decUser));
    if (data2.length === 0 || data2[0].loginToken !== goodToken) {
      res.status(401).send('No user found!');
      return;
    }
    next();
  } catch (e) {
    if (e.code === 'ERR_CRYPTO_INVALID_IV') {
      res.status(401).send('No user found!');
      return;
    }
    res.status(500).send('No user found!');
    signale.fatal('Error in tokenValidator', e);
  }
};
