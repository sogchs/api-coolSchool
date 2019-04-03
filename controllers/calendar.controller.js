const Event = require('../models/event.model');

module.exports.listEvent = (req, res, next) => {
  //Event.find({ "classroom": req.params.id }) 
    Event.find({$or: [{"classroom": req.params.id}, {"role": "school"}]})
      .then((event) => {res.status(201).json(event)})
      .catch(err => next(err))
}


module.exports.createEvent = (req, res, next) => {
  const event = new Event(req.body);

  event.save()
    .then(event => res.status(201).json(event))
    .catch(next);
}

module.exports.detailEvent = (req, res, next) => {
  Event.findById(req.params.id)
      .then((event) => {res.status(201).json(event)})
      .catch(err => next(err))
}

module.exports.editEvent = (req, res, next) => {
  Event.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((event) => {res.status(201).json(event)})
      .catch(err => next(err))
}

module.exports.deleteEvent = (req, res, next) => {
  Event.findByIdAndDelete({ _id: req.params.id })
      .then((event) => {res.status(204).json(event)})
      .catch(err => next(err))
}