const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'devsecret';

function sign(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '8h' });
}

function verify(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { sign, verify, SECRET };
