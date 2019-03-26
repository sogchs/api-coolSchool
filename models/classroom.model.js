const mongoose = require('mongoose');
const User = require('./user.model');

const classroomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  teachers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  accountPay: {
    type: String
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

// classroomSchema.virtual('user', {
//   ref: User.modelName,
//   localField: '_id',
//   foreignField: 'class',
//   options: { sort: { position: -1 } }
// })


const Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;