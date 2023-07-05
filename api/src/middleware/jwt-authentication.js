const { Strategy, ExtractJwt } = require('passport-jwt');
const { Passport } = require('passport');

const { usersDB } = require('../data-access');
const { JWT_SECRET } = require('../config');

const ApplyJWTPassportStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = JWT_SECRET;
  passport.use(
    new Strategy(options, async (payload, done) => {
      const user = await usersDB.findByUsername({ username: payload.username });
      if (user) {
        return done(null, {
          username: user.username,
          id: user.id,
        });
      }
      return done(null, false);
    }),
  );
};

const JWTAuthPassport = new Passport();
ApplyJWTPassportStrategy(JWTAuthPassport);
const JWTAuthentication = JWTAuthPassport.authenticate('jwt', { session: false });

module.exports = JWTAuthentication;
