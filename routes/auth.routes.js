const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

//edit profiles teacher and student
router.get('/profile', secure.isAuthenticated, auth.getProfile);
router.put('/profile/:id', secure.isAuthenticated, auth.editProfile);

//search user by email
router.post('/user', secure.isAuthenticated, auth.searchUserByEmail);

module.exports = router;