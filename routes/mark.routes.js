const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid')
const markController = require('../controllers/mark.controller')

router.get('/',secure.isAuthenticated, markController.listMark);
router.post('/',secure.isAuthenticated, markController.createMark);
router.put('/:id',secure.isAuthenticated, markController.editMark);
router.delete('/:id',secure.isAuthenticated, markController.deleteMark);

module.exports = router;