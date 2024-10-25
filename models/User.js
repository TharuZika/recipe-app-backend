const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    unique: false,
  },
  lastname: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteRecipes: [
    {
      type: String,
    },
  ],
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);