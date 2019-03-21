const Classroom = require('../models/classroom.model');

module.exports.listClassroom = (req, res, next) => {
    Classroom.find()
        .populate('user')
        .then((classroom) => {res.status(201).json(classroom)})
        .catch(err => next(err))
  }

module.exports.createClassroom = (req, res, next) => {
    const classroom = new Classroom( req.body );

    classroom.save()
        .then((classroom) => { res.status(201).json(classroom) })
        .catch(err => next(err))
}

module.exports.detailClassroom = (req, res, next) => {
    Classroom.findById(req.params.id)
        .populate('user')
        .then((classroom) => {
            if (!classroom) {
                throw createError(404, 'Sorry, Classroom not found');
              } else {
                res.json(classroom);
              }
            })
            .catch(next);
}

module.exports.editClassroom = (req, res, next) => {
  Classroom.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((classroom) => {
          if (!classroom) {
              throw createError(404, 'Sorry, Classroom not found');
            } else {
              res.json(classroom);
            }
          })
          .catch(next);
}

module.exports.deleteClassroom = (req, res, next) => {
    Classroom.findByIdAndDelete({ _id: req.params.id })
        .then((classroom) => {
            if (!classroom) {
                throw createError(404, 'Sorry, Classroom not found');
              } else {
                res.status(204).json();
              }
            })
            .catch(next);        
}