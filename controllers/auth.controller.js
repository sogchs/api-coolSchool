const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');

module.exports.register = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        throw createError(409, 'User already registered in coolSchool')
      }else {

        return new User(req.body).save()
      }
    })
    .then(user => res.status(201).json(user))
    .catch(next);
}

module.exports.login = (req, res, next) => {
  passport.authenticate('local-auth', (error, user, message) => {
    if (error) next(error)
    else if (!user) throw createError(401, message)
    else {
      req.login(user, error => {
        if (error) next(error)
        else res.status(201).json(user)
      })
    }
  })(req, res, next);
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204).json();
}

module.exports.getProfile = (req, res, next) => {
  res.json(req.user);
}

module.exports.editProfile = (req, res, next) => {
  //delete req.body.email; 
  
  User.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
}

module.exports.searchUserByEmail = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return user;
      } else {
        throw createError(409, 'Sorry, this user is not "cool"')
      }
    })
    .then(user => res.status(201).json(user))
    .catch(next);
}

