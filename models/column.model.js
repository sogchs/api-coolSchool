const mongoose = require('mongoose');

const Card = require('../models/card.model');

const columnSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
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
  foreignField: 'column',
  options: { sort: { position: -1 } }
})


const Column = mongoose.model('Column', columnSchema);
module.exports = Column;