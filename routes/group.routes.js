const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const groupController = require('../controllers/group.controller');

router.get('/:id',secure.isAuthenticated, groupController.listGroups);
router.post('/',secure.isAuthenticated, groupController.createGroup);
router.delete('/:id',secure.isAuthenticated, groupController.deleteGroup);

module.exports = router;