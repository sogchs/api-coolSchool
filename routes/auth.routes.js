const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');
const uploader = require('../configs/storage.config');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

//edit profiles teacher and student
router.get('/profile', secure.isAuthenticated, auth.getProfile);
router.put('/profile', secure.isAuthenticated, uploader.single('avatar'), auth.editProfile);

module.exports = router;