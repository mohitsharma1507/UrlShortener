require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
