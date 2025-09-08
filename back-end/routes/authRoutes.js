const express = require('express');
const { register, login, logout, updateUser, findPerson } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/update', updateUser);
router.get('/me', findPerson); 

module.exports = router;
