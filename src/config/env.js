const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: process.env.PORT || 3000,
  dbProvider: process.env.DB_PROVIDER || "mongo",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/registration_api",
  jwtSecret: process.env.JWT_SECRET || "change-me-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  nodeEnv: process.env.NODE_ENV || "development"
};

module.exports = env;
