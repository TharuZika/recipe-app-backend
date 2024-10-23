const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));