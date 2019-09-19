const config = {
  database_url: process.env.COSMOSDB_PRODUCTION,
  database_name: process.env.COSMOSDB_NAME_PRODUCTION,
  jwt_secret_key: process.env.JWT_SECRET_PRODUCTION,
  web_port: process.env.PORT,
};

module.exports = config;
