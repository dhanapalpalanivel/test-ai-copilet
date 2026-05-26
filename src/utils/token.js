const jwt = require("jsonwebtoken");
const env = require("../config/env");

function createAuthToken(userId) {
  return jwt.sign({ sub: String(userId) }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
}

module.exports = {
  createAuthToken
};
