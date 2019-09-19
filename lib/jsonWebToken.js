const expressJwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config/environment');

function getToken(req) {
  const { authorization } = req.headers;
  if (authorization) {
    return authorization;
  }
  throw new Error('authorization not found in headers!!');
}

function jwt() {
  return expressJwt({
    secret: config.jwt_secret_key,
    credentialsRequired: false,
    getToken,
  }).unless({
    path: [
      '/',
      '/api-docs',
      '/api/v1/signIn',
    ],
  });
}

const currentUser = (req) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const decode = jsonwebtoken.verify(authorization, config.jwt_secret_key);
      return decode;
    }
  } catch (e) {
    throw new Error('authorization not found in headers!!');
  }
};

module.exports.jwt = jwt;
module.exports.currentUser = currentUser;