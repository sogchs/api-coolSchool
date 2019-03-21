const mongoose = require('mongoose');

const Card = require('../models/card.model');

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  classroom:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  }  
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

columnSchema.virtual('cards', {
  ref: Card.modelName,
  localField: '_id',
  foreignField: 'column'
})


const Column = mongoose.model('Column', columnSchema);
module.exports = Column;