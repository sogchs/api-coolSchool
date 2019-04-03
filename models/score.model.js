const mongoose = require('mongoose');

const TYPE = ['positive', 'negative']

const scoreSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: TYPE,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  scoreNumber: {
    type: String,
    required: true
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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