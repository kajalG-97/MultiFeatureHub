import express from 'express';
import passport from 'passport';
import { generateToken } from '../utils/jwt';
import {
  login,
  register,
  setPassword,
  getUserDetails,
} from '../controllers/auth';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => {
    res.send('Welcome to google');
  },
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: false,
  }),
  (req, res) => {
    const user = req.user; // Assuming req.user is the authenticated user
    console.log('😍 Successfully logged in');
    const token = generateToken(req.user._id);
    if (!user.password) {
      // Redirect to complete-signup with token in URL params
      res.redirect(
        `${process.env.CLIENT_URL}/complete-signup?token=${token}&requiresPassword=true`,
      );
    } else {
      // Redirect to dashboard with token in URL params
      res.redirect(
        `${process.env.CLIENT_URL}/complete-signup?token=${token}&requiresPassword=false`,
      );
    }
  },
);

router.post('/register', register);
router.post('/login', login);
router.post('/set-password', isAuthenticated, setPassword);
router.get('/user', isAuthenticated, getUserDetails);

export default router;
