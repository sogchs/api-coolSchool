const Message = require('../models/message.model');

module.exports.listMessages = (req, res, next) => {
  Message.find({
    $or: [
      {recipient: req.params.localUser, sender: req.params.otherUser}, 
      {sender: req.params.localUser, recipient: req.params.otherUser}
    ]
  })
      .then((message) => {res.status(201).json(message)})
      .catch(err => next(err))
}


module.exports.createMessage = (req, res, next) => {
  const message = new Message(req.body);

  message.save()
    .then(message => res.status(201).json(message))
    .catch(next);
}

module.exports.listRead = (req, res, next) => {
  Message.find({
    classroom: req.params.id
  })
      .then((message) => {res.status(201).json(message)})
      .catch(err => next(err))
}
