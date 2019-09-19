const config = {
  database_url: process.env.MONGO_DEVELOPMENT,
  database_name: process.env.MONGO_NAME_DEVELOPMENT,
  jwt_secret_key: process.env.JWT_SECRET_DEVELOPMENT,
  web_port: process.env.PORT,
};

module.exports = config;
