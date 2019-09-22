const question = require('../src/api/v1/controllers/question');

const questionRoutes = (app) => {
  app.post('/api/v1/test/:id/question', question.create);
  app.get('/api/v1/test/:id/questions', question.list);
};

module.exports = questionRoutes;
