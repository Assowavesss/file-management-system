// terminal : openssl rand -hex 32
export default {
  secret: process.env.JWT_SECRET, // Assurez-vous de définir une clé secrète forte en production
  expiresIn: '3h', // Durée de validité du token
};
