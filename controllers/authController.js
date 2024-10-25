const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ flag: false, errors: errors.array() });
  }

  const { firstname, lastname, email, phonenumber, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ flag: false, msg: 'User already exists' });
    }
    
    user = new User({
      firstname,
      lastname,
      email,
      phonenumber,
      password
    });

    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(201).json({ flag: true, token: token });
  } catch (err) {
    // console.log(err);
    res.status(200).json({ flag: false, msg: 'Server error' });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ flag: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ flag: false, msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ flag: false, msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ flag: true, token: token });
  } catch (err) {
    res.status(200).json({ flag: false, msg: 'Server error' });
  }
};
