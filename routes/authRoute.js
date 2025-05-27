const express = require('express');
const {createNewUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Create a user
router.post('/register', createNewUser)

// User login 
router.post('/login', loginUser);

module.exports = router;