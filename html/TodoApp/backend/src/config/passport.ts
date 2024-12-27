import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import dotenv from 'dotenv';
import User from '../models/userModel';
dotenv.config();

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Google Profile:', profile);
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.email,
      });
      done(null, newUser);
    },
  ),
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
