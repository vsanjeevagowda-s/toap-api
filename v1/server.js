const express = require('express');

const app = express();
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { requestlogger, infoLogger } = require('./config/winston');
const { jwt, currentUser } = require('./lib/jsonWebToken');
const path = require('path');

const {
  ProxyServer,
} = require('./lib/proxy-server');
const {
  closeDuplicateConnection,
  getFreePort,
} = require('./src/helpers/ssh');

const {
  register,
  session,
  device,
  location,
  alert,
  scene,
  sceneGroup,
  webhook,
  sceneType,
  organization,
  userInvitation,
  deviceMonitoring,
  mfa,
} = require('./routes');
const respStructure = require('./src/api/apiResponse');

const swaggerDocument = YAML.load('./swagger.yaml');
const config = require('./config/environment');

app.use(requestlogger);
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.json({ title: 'Welcome topa api!!' });
});

app.use(jwt());
 
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError' || err.name === 'Error') {
    res.status(401).json(respStructure.responseStructure('ERROR', { error: `${err.name}: ${err.message}` }));
  }
});

app.use((req, res, next) => {
  const decoded = currentUser(req);
  req.currentUser = decoded;  
  next();
});

register(app);
session(app);


const server = app.listen(config.web_port, () => {
  infoLogger({ message: `Edgeplayer api listening on port ${config.web_port}!` });
  console.log(`Edgeplayer api listening on port ${config.web_port}!`);
});

module.exports = app;
