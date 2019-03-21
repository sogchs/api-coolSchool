const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const chatController = require('../controllers/chat.controller');



router.get('/',secure.isAuthenticated, chatController.conversation);
router.post('/', secure.isAuthenticated, chatController.createMessage);

module.exports = router;