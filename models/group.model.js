const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subgroups: {
    type: mongoose.Schema.Types.Mixed,
    validate: (subgroup) => !Object.values(subgroup).some(value => !(value instanceof Array)),
    required: true
  },
  classroom: {
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



const Group = mongoose.model('Group', groupSchema);
module.exports = Group;