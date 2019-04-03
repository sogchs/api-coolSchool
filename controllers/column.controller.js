const Column = require('../models/column.model');

module.exports.listColumn = (req, res, next) => {
    Column.find({ "classroom": req.params.id }) 
        .populate('cards')
        .then((columns) => {res.status(201).json(columns)})
        .catch(err => next(err))
  }


module.exports.createColumn = (req, res, next) => {
    const column = new Column( req.body );

    column.save()
        .then((column) => { res.status(201).json(column) })
        .catch(err => next(err))
}

module.exports.editColumn = (req, res, next) => {
    Column.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then((column) => {
            if (!column) {
                throw createError(404, 'Column not found');
              } else {
                res.json(column);
              }
            })
            .catch(next);
}

module.exports.deleteColumn = (req, res, next) => {
    Column.findByIdAndDelete({ _id: req.params.id })
        .then((column) => {
            if (!column) {
                throw createError(404, 'Column not found');
              } else {
                res.status(204).json();
              }
            })
            .catch(next);        
}