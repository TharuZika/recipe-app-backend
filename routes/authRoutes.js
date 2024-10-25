const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { registerValidationRules, loginValidationRules } = require('../util/authValidator'); // Import validation rules
const router = express.Router();

router.post('/register', registerValidationRules(), registerUser);
router.post('/login', loginValidationRules(), loginUser);

module.exports = router;
