// index.js
//checking....
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Visitor from './models/Visitor.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
