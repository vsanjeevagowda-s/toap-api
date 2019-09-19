const config = {
  database_url: process.env.COSMOSDB_TEST,
  database_name: process.env.COSMOSDB_NAME_TEST,
  jwt_secret_key: process.env.JWT_SECRET_TEST,
  web_port: process.env.PORT,
};

module.exports = config;
