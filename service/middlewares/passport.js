import passport from 'passport';
import passportJwt, { ExtractJwt } from 'passport-jwt';
import { PrismaClient } from '@prisma/client';

const StrategyJwt = passportJwt.Strategy;
const prisma = new PrismaClient();

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) =>
      prisma.user
        .findUnique({ where: { id: jwtPayload.id } })
        .then((user) => done(null, user))
        .catch((err) => done(err))
  )
);

export default passport;
