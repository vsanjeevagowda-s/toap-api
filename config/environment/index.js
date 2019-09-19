/* eslint-disable import/no-dynamic-require */
require('dotenv').config();

const config = require(`./${process.env.NODE_ENV}`);

module.exports = config;
