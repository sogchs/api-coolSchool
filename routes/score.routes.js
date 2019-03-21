const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid')
const scoreController = require('../controllers/score.controller')

router.get('/',secure.isAuthenticated, scoreController.listScore);
router.post('/',secure.isAuthenticated, scoreController.createScore);
router.delete('/:id',secure.isAuthenticated, scoreController.deleteScore);

module.exports = router;