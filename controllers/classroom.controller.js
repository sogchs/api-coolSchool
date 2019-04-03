const Classroom = require('../models/classroom.model');
const Checklist = require('../models/checklist.model')
const Score = require('../models/score.model')

module.exports.listClassroom = (req, res, next) => {
    Classroom.find({ "teachers" : req.user.id })
        .populate('students')
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
        .populate('students')
        .then((classroom) => {
          console.log( classroom )
            if (!classroom) {
                throw createError(404, 'Sorry, Classroom not found');
              } else {
                res.json(classroom);
              }
            })
            .catch(next);
}


module.exports.editClassroom = (req, res, next) => {
  const students = req.body.students || [];
  delete req.body.students;

  Classroom.findByIdAndUpdate(
      { _id: req.params.id },
      { 
        $set: req.body,
        $addToSet: { students: students } 
      },
      { new: true})
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

module.exports.createChecklist = (req, res, next) => {
  const checklist = new Checklist( req.body );

  checklist.save()
      .then((checklist) => { res.status(201).json(checklist) })
      .catch(err => next(err))
}

module.exports.createScore = (req, res, next) => {
  const score = new Score( req.body );

  score.save()
      .then((score) => { res.status(201).json(score) })
      .catch(err => next(err))
}

module.exports.getChecklist = (req, res, next) => {
  const dateToday = new Date().toDateString()

  Checklist.findOne({ "classroom" : req.params.id, "date": dateToday })
      .then((checklist) => {
          if (!checklist) {
              throw createError(404, 'Sorry, don´t have checklist today');
            } else {
              res.json(checklist);
            }
          })
          .catch(next);
}