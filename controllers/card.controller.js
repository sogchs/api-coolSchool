const Card = require('../models/card.model');

module.exports.listCard = (req, res, next) => {
  Card.find()
      .then((cards) => {res.status(201).json(cards)})
      .catch(err => next(err))
}


module.exports.createCard = (req, res, next) => {
  const card = new Card(req.body);

  console.log(req.file);
  if (req.file) {
    card.attachURL = req.file.secure_url;
  }

  card.save()
    .then(card => res.status(201).json(card))
    .catch(next);
}

module.exports.detailCard = (req, res, next) => {
  Card.findById(req.params.id)
      .then((card) => {res.status(201).json(card)})
      .catch(err => next(err))
}

module.exports.editCard = (req, res, next) => {
  Card.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((card) => {res.status(201).json(card)})
      .catch(err => next(err))
}

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete({ _id: req.params.id })
      .then((card) => {res.status(204).json(card)})
      .catch(err => next(err))
}