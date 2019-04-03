const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const calendarController = require('../controllers/calendar.controller');

router.get('/:id',secure.isAuthenticated, calendarController.listEvent);
router.post('/',secure.isAuthenticated, calendarController.createEvent);
router.get('/event/:id', secure.isAuthenticated, calendarController.detailEvent);
router.put('/:id', secure.isAuthenticated, calendarController.editEvent);
router.delete('/:id', secure.isAuthenticated, calendarController.deleteEvent);

module.exports = router;