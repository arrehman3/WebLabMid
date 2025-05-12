// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Visitor from './models/Visitor.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


dotenv.config();
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Add a visitor
app.post('/api/visitors', async (req, res) => {
  const { name, toVisit, purpose } = req.body;
  const visitor = new Visitor({ name, toVisit, purpose, timestamp: new Date() });
  await visitor.save();
  res.status(201).json(visitor);
});

// Get all visitors
app.get('/api/visitors', async (req, res) => {
  const visitors = await Visitor.find().sort({ timestamp: -1 });
  res.json(visitors);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
