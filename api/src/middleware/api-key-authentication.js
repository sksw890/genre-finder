const { Strategy } = require('passport-http-bearer');
const { Passport } = require('passport');

const { API_SECRET_TOKEN } = require('../config');

const ApplyAPIKeyPassportStrategy = (passport) => {
  passport.use(new Strategy(
    (token, cb) => {
      if (token !== API_SECRET_TOKEN) {
        return cb(null, false);
      }
      return cb(null, true);
    },
  ));
};
const apiKeyAuthPassport = new Passport();
ApplyAPIKeyPassportStrategy(apiKeyAuthPassport);
const apiKeyAuthentication = apiKeyAuthPassport.authenticate('bearer', { session: false });

module.exports = apiKeyAuthentication;
