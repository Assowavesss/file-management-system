// Middleware for JWT authentication
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config'); // Import your JWT configuration

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Missing authentication token.' });
  }

  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    req.user = user; // You can store the user information in the request object for future use
    next();
  });
};

module.exports = authenticateJWT;
