const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Classroom = require('../models/classroom.model');

const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required',
    unique: true,
    lowercase: true,
    trim: true,
    match: [EMAIL_PATTERN, 'Invalid email pattern']
  },
  password: {
    type: String,
    required: 'Password is required',
    match: [PASSWORD_PATTERN, 'Passwords must contain at least six characters, including uppercase, lowercase letters and numbers.']
  },
  school: {
    type: String
  },
  name: {
    type: String,
    required: 'Your Name is required'
  },
  surname: {
    type: String,
    required: 'Your Surname is required'
  },
  imageURL: {
    type: String,
    default: '/images/default-user.png'//esto debe ser una imagen aleatoria de los avatares
  },
  role: {
    type: String,
    enum: ['teacher', 'student'],
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
      delete ret.password;
      return ret;
    }
  }
});

userSchema.virtual('classroom', {
  ref: Classroom.modelName,
  localField: '_id',
  foreignField: 'user',
  options: { sort: { position: -1 } }
})

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          })
      })
      .catch(next)
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
