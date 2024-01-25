const passport = require('passport');
const passportJwt = require('passport-jwt');
require('dotenv').config();
const { ExtractJwt } = passportJwt;
const StrategyJwt = passportJwt.Strategy;
const User = require('../models/user.model');

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
