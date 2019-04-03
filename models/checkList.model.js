const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
  nonAttendance: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  observations: {
    type: String
  },
  date: {
    type: String,
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

const Checklist = mongoose.model('Checklist', checklistSchema);
module.exports = Checklist;