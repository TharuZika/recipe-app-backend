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
    origin: process.env.RACT_APP_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', recipeRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));