// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Visitor from './models/Visitor.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://100.27.195.165:3000'
  ]
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/secure-nest')
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

app.listen(PORT,'0.0.0.0',() => console.log(`Server running on port ${PORT}`));
