const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB connection error:', err));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;