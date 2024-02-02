// passport.js
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { ExtractJwt } = passportJwt;
const StrategyJwt = passportJwt.Strategy;
const User = require('../prisma/schema.prisma'); // Assurez-vous que le chemin vers le modèle utilisateur est correct

// Configuration de la stratégie Passport JWT
passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) =>
      User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => done(null, user))
        .catch((err) => done(err))
  )
);

module.exports = passport;
