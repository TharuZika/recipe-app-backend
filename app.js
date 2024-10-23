const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend's address
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // If you are handling cookies or authentication
}));

// Connect to the database
connectDB();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));