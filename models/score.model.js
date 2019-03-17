const mongoose = require('mongoose');

const TYPE = ['Positive', 'Negative']

const scoreSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: TYPE
  },
  reason: {
    type: String,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  scoreNumber: {
    type: Number,
    required: true
  }
  
}, {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    } 
});


const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;