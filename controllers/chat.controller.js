const Message = require('../models/message.model');

module.exports.conversation = (req, res, next) => {
  Message.find()
      .then((message) => {res.status(201).json(message)})
      .catch(err => next(err))
}


module.exports.createMessage = (req, res, next) => {
  const message = new Message(req.body);

  message.save()
    .then(message => res.status(201).json(message))
    .catch(next);
}
