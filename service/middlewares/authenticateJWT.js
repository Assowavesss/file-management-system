const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config'); // Import your JWT configuration

const authenticateJWT = (req, res, next) => {
  // L'en-tête d'autorisation normalement contient 'Bearer <token>'
  const authHeader = req.headers.authorization;
  
  // Log the received authHeader for debugging purposes
  console.log('Received authHeader:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authentication token.' });
  }

  // Split the authHeader to extract the token
  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    const token = parts[1];
    
    // Log the extracted token for debugging purposes
    console.log('Extracted JWT token:', token);

    jwt.verify(token, jwtConfig.secret, (err, user) => {
      if (err) {
        console.log('JWT verification error:', err); // Log any verification error
        return res.status(403).json({ error: 'Invalid token.' });
      }

      req.user = user;
      next();
    });
  } else {
    // The authHeader is not in 'Bearer <token>' format
    return res.status(401).json({ error: 'Token is not in the correct format.' });
  }
};

module.exports = authenticateJWT;
