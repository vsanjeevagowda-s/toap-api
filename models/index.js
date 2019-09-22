const mongoose = require('mongoose');
const { infoLogger } = require('../config/winston');
const User = require('./user.model');
const Test = require('./test.model');
const config = require('../config/environment');
mongoose.set('debug', (coll, method, query, doc) => {
  infoLogger({
    coll, method, query, doc,
  });
});

mongoose.Promise = global.Promise;

mongoose.connect(`${config.database_url}/${config.database_name}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log(`Mongoose default connection open to ${config.database_url}`);
});

module.exports = {
  User,
  Test,
  db,
};
