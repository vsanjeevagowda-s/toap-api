const question = require('../src/api/v1/controllers/question');
const authorize = require('../lib/authorize');
const USER_ROLES = require('../config/constants').USER_ROLES;
let { ADMIN, CANDIDATE} = USER_ROLES;

const questionRoutes = (app) => {
  app.post('/api/v1/test/:id/question', authorize([ADMIN]), question.create);
  app.get('/api/v1/test/:id/questions',  authorize([ADMIN, CANDIDATE]), question.list);
};

module.exports = questionRoutes;
