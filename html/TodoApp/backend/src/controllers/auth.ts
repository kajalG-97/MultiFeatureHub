import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    res
      .status(400)
      .json({ message: 'Please provide name, email, and password' });
    return;
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Store hashed password
    });

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      },
    );

    // Send response with token and user data
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    res.status(400).json({ message: 'Please provide email and password' });
    return;
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    // Send response with token and user data
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

const setPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { email } = req.user;

  // Validate input
  if (!password) {
    res.status(400).json({ message: 'Please provide password' });
    return;
  }

  try {
    // Find user by email (from Google login)
    const user = await User.findOne({ email });

    // If user does not exist or already has a password
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (user.password) {
      res.status(400).json({ message: 'User already has a password' });
      return;
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message:
        'Password set successfully. You can now log in with email and password.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error setting password', error });
  }
};

const getUserDetails = async (req: Request, res: Response) => {
  try {
    console.log('Getting USER DETAILS', req.user);
    res.status(200).json({
      data: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error setting password', error });
  }
};

const checkPassword = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id); // Assuming req.user is populated by your isAuthenticated middleware

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has a password set
    const needsPassword = !user.password; // If password is empty or not set
    return res.json({ needsPassword });
  } catch (error) {
    console.error('Error checking password:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
export { register, login, setPassword, getUserDetails, checkPassword };
