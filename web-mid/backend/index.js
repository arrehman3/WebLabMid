// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Visitor from './models/Visitor.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // ✅ Define app first!

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // ✅ Now safe to use

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API routes
app.post('/api/visitors', async (req, res) => {
  const { name, toVisit, purpose } = req.body;
  const visitor = new Visitor({ name, toVisit, purpose, timestamp: new Date() });
  await visitor.save();
  res.status(201).json(visitor);
});

app.get('/api/visitors', async (req, res) => {
  const visitors = await Visitor.find().sort({ timestamp: -1 });
  res.json(visitors);
});

// React SPA fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}...`);
});
