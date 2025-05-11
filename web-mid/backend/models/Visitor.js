import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  name: String,
  toVisit: String,
  purpose: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Visitor', visitorSchema);
