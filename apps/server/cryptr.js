const Cryptr = require('cryptr');
require('dotenv').config();

const cryptrPass = new Cryptr(process.env.CRYPTR_PASS);
const cryptrToken = new Cryptr(process.env.CRYPTR_TOKEN);

module.exports = {
  encPass(pass) {
    return cryptrPass.encrypt(pass);
  },
  decPass(pass) {
    return cryptrPass.decrypt(pass);
  },
  encToken(token) {
    return cryptrToken.encrypt(token);
  },
  decToken(token) {
    return cryptrToken.decrypt(token);
  },
};
