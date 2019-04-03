const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const columnsController = require('../controllers/column.controller');

router.get('/:id',secure.isAuthenticated, columnsController.listColumn);
router.post('/',secure.isAuthenticated, columnsController.createColumn);
router.put('/:id',secure.isAuthenticated, columnsController.editColumn);
router.delete('/:id',secure.isAuthenticated, columnsController.deleteColumn);

module.exports = router;