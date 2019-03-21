const Calendar = require('../models/calendar.model');

module.exports.listCalendar = (req, res, next) => {
  Calendar.find({ "role": "School", "classroom": req.classroom.id })  //revisar esta linea, tiene que listar todos los que sean del role School y los que sean de la clase
      .then((calendar) => {res.status(201).json(calendar)})
      .catch(err => next(err))
}


module.exports.createCalendar = (req, res, next) => {
  const calendar = new Calendar(req.body);

  calendar.save()
    .then(calendar => res.status(201).json(calendar))
    .catch(next);
}

module.exports.detailCalendar = (req, res, next) => {
  Calendar.findById(req.params.id)
      .then((calendar) => {res.status(201).json(calendar)})
      .catch(err => next(err))
}

module.exports.editCalendar = (req, res, next) => {
  Calendar.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((calendar) => {res.status(201).json(calendar)})
      .catch(err => next(err))
}

module.exports.deleteCalendar = (req, res, next) => {
  Calendar.findByIdAndDelete({ _id: req.params.id })
      .then((calendar) => {res.status(204).json(calendar)})
      .catch(err => next(err))
}