const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const upLoader = require('../configs/storage.config');
const cardsController = require('../controllers/card.controller');



router.get('/',secure.isAuthenticated, cardsController.listCard);
router.post('/', secure.isAuthenticated, upLoader.array('attachFiles'), cardsController.createCard);
router.get('/:id', secure.isAuthenticated, cardsController.detailCard);
router.put('/:id', secure.isAuthenticated, cardsController.editCard);
router.delete('/:id', secure.isAuthenticated, cardsController.deleteCard);

module.exports = router;