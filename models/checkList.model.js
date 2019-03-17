const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
  assistants: {
    type: [String], //creo que esto deberia ser un array de Object.id
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  note: {
    type: String
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