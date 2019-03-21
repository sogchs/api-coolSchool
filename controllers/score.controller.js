const Score = require('../models/score.model');

module.exports.listScore = (req, res, next) => {
    Score.find({ "classroom": req.classroom.id }) 
        .populate('user')
        .then((score) => {res.status(201).json(score)})
        .catch(err => next(err))
  }


module.exports.createScore = (req, res, next) => {
    const score = new Score( req.body );

    score.save()
        .then((score) => { res.status(201).json(score) })
        .catch(err => next(err))
}


module.exports.deleteScore = (req, res, next) => {
    Score.findByIdAndDelete({ _id: req.params.id })
        .then((score) => {
            if (!score) {
                throw createError(404, 'Score not found');
              } else {
                res.status(204).json();
              }
            })
            .catch(next);        
}