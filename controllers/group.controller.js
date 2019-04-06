const Group = require('../models/group.model');


module.exports.listGroups = (req, res, next) => {
    Group.find({ "classroom" : req.params.id })
        .then((group) => {res.status(201).json(group)})
        .catch(err => next(err))
  }

module.exports.createGroup = (req, res, next) => {
    const group = new Group( req.body );

    group.save()
        .then((group) => { res.status(201).json(group) })
        .catch(err => next(err))
}



module.exports.deleteGroup = (req, res, next) => {
    Group.findByIdAndDelete({ _id: req.params.id })
        .then((group) => {
            if (!group) {
                throw createError(404, 'Sorry, Group not found');
              } else {
                res.status(204).json();
              }
            })
            .catch(next);        
}

