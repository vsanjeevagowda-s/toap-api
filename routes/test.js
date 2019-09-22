const test = require('../src/api/v1/controllers/test');

const testRoutes = (app) => {
  app.post('/api/v1/test', test.create);
  app.get('/api/v1/test', test.list);
};

module.exports = testRoutes;
