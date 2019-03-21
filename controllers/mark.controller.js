const Mark = require('../models/mark.model');

module.exports.listMark = (req, res, next) => {
    Mark.find({ "classroom": req.classroom.id }) 
        .populate('user')
        .then((mark) => {res.status(201).json(mark)})
        .catch(err => next(err))
  }


module.exports.createMark = (req, res, next) => {
    const mark = new Mark( req.body );

    mark.save()
        .then((mark) => { res.status(201).json(mark) })
        .catch(err => next(err))
}


module.exports.editMark = (req, res, next) => {
  Mark.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((mark) => {
          if (!mark) {
              throw createError(404, 'Mark not found');
            } else {
              res.json(mark);
            }
          })
          .catch(next);
}


module.exports.deleteMark = (req, res, next) => {
    Mark.findByIdAndDelete({ _id: req.params.id })
        .then((mark) => {
            if (!mark) {
                throw createError(404, 'Mark not found');
              } else {
                res.status(204).json();
              }
            })
            .catch(next);        
}