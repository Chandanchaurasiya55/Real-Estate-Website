import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import route from './Routes/userAuth.Routes.js';
import adminRoute from './Routes/adminAuth.route.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

// Mount auth routes
app.use('/api/auth', route);
app.use('/api/auth', adminRoute);

// Health route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;