const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const chatController = require('../controllers/chat.controller');



router.get('/:localUser/:otherUser',secure.isAuthenticated, chatController.listMessages);
router.post('/', secure.isAuthenticated, chatController.createMessage);
router.get('/:id',secure.isAuthenticated, chatController.listRead);
module.exports = router;