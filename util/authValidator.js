const { body } = require('express-validator');

const registerValidationRules = () => {
  return [
    body('firstname').notEmpty().withMessage('First name is required'),
    body('lastname').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('phonenumber').isMobilePhone().withMessage('Phone number is not valid'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
  ];
};

const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
};

module.exports = { registerValidationRules, loginValidationRules };
