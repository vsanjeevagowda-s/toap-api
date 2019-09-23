const user = require('../src/api/v1/controllers/user');
const authorize = require('../lib/authorize');
const USER_ROLES = require('../config/constants').USER_ROLES;
let { ADMIN, CANDIDATE} = USER_ROLES;


const userRoutes = (app) => {
  app.get('/api/v1/user', authorize([ADMIN, CANDIDATE]), user.getUserByToken);
};

module.exports = userRoutes;
