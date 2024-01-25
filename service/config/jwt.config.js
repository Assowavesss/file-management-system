// terminal : openssl rand -hex 32
module.exports = {
  secret: process.env.JWT_SECRET, // Assurez-vous de définir une clé secrète forte en production
  expiresIn: '3h', // Durée de validité du token
};
