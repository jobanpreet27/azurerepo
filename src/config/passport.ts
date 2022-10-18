import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/User';
import { config } from './config';

const { Strategy, ExtractJwt } = passportJWT;

const secret = config.jwt.secrect;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const strategy = new Strategy(options, function (payload, next) {
  User.findOne({ _id: payload.id }, function (err: any, user: any) {
    if (err) return next(err, false);
    if (user) {
      return next(null, user);
    } else {
      return next(null, false);
    }
  });
});

passport.use(strategy);

export default passport;
export { secret };
export const auth = passport.authenticate('jwt', { failureRedirect: '/login', failureMessage: true });
