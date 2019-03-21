const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid');
const calendarController = require('../controllers/calendar.controller');

router.get('/',secure.isAuthenticated, calendarController.listCalendar);
router.post('/',secure.isAuthenticated, calendarController.createCalendar);
router.get('/:id', secure.isAuthenticated, calendarController.detailCalendar);
router.put('/:id', secure.isAuthenticated, calendarController.editCalendar);
router.delete('/:id', secure.isAuthenticated, calendarController.deleteCalendar);

module.exports = router;