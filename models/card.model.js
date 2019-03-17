const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  attachURL: {
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

cardSchema.index({ column: 1 }, { unique: true });

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;