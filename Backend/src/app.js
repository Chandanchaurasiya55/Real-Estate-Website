import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import route from './Routes/userAuth.Routes.js';
import adminRoute from './Routes/adminAuth.route.js';
import propertyRoute from './Routes/property.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));
app.use(cookieParser());

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'], // React dev server (try different ports)
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images from /uploads
app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));

// Mount auth + property routes
app.use('/api/auth', route);
app.use('/api/auth', adminRoute);
app.use('/api/properties', propertyRoute);

// Health route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;