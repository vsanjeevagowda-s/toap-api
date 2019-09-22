const user = require('../src/api/v1/controllers/user');

const userRoutes = (app) => {
  app.get('/api/v1/user', user.getUserByToken);
};

module.exports = userRoutes;
