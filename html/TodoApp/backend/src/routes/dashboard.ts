import express from 'express';

import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.send('Welcome to your dashboard!');
});

export default router;
