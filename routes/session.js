const session = require('../src/api/v1/controllers/session');

const sessionRoutes = (app) => {
  app.post('/api/v1/signIn', session.session);
};

module.exports = sessionRoutes;
