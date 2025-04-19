const jwt = require("jsonwebtoken");

const SECRET_KEY = "enursery-secret-key"; // Nanti kita pindah ke .env

exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
