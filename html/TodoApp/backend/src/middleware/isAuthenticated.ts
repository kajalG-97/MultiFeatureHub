import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;

  // Check for JWT-based authentication if no session is found
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log('decoded token: ', decoded);
      const existingUser = await User.findOne({ _id: decoded.userId });
      console.log('existing user: ', existingUser);
      req.user = existingUser;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
  // else {
  //   // Check for session-based authentication first
  //   if (req.isAuthenticated()) {
  //     next();
  //   }
  // }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
