import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import './config/passport';
import DBConnection from './config/mongoConfig';
import authRoutes from './routes/authRoutes';
import tasksRoutes from './routes/tasksRoutes';
import passport from 'passport';
import { isAuthenticated } from './middleware/isAuthenticated';

dotenv.config();

const PORT = process.env.PORT || '5000';

const app = express();

DBConnection(app, PORT);

// Middleware
app.use(
  session({
    secret: 'sdfasfdasdEEEy', // Replace this with a strong secret key
    resave: false, // Forces session to be saved even when unmodified
    saveUninitialized: false, // Forces uninitialized sessions to be saved to the store
    cookie: { secure: false }, // Set `secure: true` in production with HTTPS
  }),
);

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.send('Task Manager Backend API');
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', isAuthenticated, tasksRoutes);

export default app;
