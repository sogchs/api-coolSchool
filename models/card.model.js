const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  attachURLS: {
    type: [String]
  },
  dateStart: {
    type: String
  },
  dateFinish: {
    type: String
  },
  accountPay: {
    type: String
  },
  amountPay: {
    type: String
  },
  conceptPay: {
    type: String
  },
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
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


const Card = mongoose.model('Card', cardSchema);
module.exports = Card;