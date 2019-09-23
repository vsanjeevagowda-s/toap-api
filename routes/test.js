const test = require('../src/api/v1/controllers/test');
const authorize = require('../lib/authorize');
const USER_ROLES = require('../config/constants').USER_ROLES;
let { ADMIN, CANDIDATE} = USER_ROLES;

const testRoutes = (app) => {
  app.post('/api/v1/test', authorize([ADMIN]), test.create);
  app.get('/api/v1/tests', authorize([ADMIN, CANDIDATE]), test.list);
};

module.exports = testRoutes;
