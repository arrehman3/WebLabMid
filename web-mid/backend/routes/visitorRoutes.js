import express from 'express';
import Visitor from '../models/Visitor.js';

const router = express.Router();

// POST - Add Visitor
router.post('/', async (req, res) => {
  try {
    const visitor = new Visitor(req.body);
    await visitor.save();
    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({ message: 'Error saving visitor', error });
  }
});

// GET - Get All Visitors
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ timestamp: -1 });
    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visitors', error });
  }
});

export default router;
