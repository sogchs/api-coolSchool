const express = require('express');
const router = express.Router();
const Classroom = require('../controllers/classroom.controller');
const secure = require('../middlewares/secure.mid');


router.post('/', secure.isAuthenticated, Classroom.createClassroom);
router.get('/', secure.isAuthenticated, Classroom.listClassroom);
router.get('/:id', secure.isAuthenticated, Classroom.detailClassroom);
router.put('/:id', secure.isAuthenticated, Classroom.editClassroom);
router.delete('/:id', secure.isAuthenticated, Classroom.deleteClassroom);
router.put('/edit/:id', secure.isAuthenticated, Classroom.editTotalClassroom);

// ****** CHECK LIST *******
router.post('/checklist', secure.isAuthenticated, Classroom.createChecklist);
router.get('/checklist/:id', secure.isAuthenticated, Classroom.getChecklist);

// ****** SCORE *******
router.post('/score', secure.isAuthenticated, Classroom.createScore);

//*********STUDNENT DETAILS*********/

router.get('/student/:id', secure.isAuthenticated, Classroom.detailStudent);
router.get('/score/:id', secure.isAuthenticated, Classroom.listScore);
router.get('/checklist-detail/:id', secure.isAuthenticated, Classroom.listChecklist);

module.exports = router;