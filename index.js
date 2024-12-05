const express = require('express')
const app = express();
const connect = require('./database/connectDB');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const teamRoutes = require('./routes/teamRoutes');
const handler = require('./middlewares/handler')
const cors = require('cors')
require('colors')
require('dotenv').config()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

connect();

app.use('/api/auth', authRoutes); // Authentication Routes
app.use('/api/users', userRoutes); // User Routes
app.use('/api/admin', adminRoutes); // Admin Routes
app.use('/api/teams', teamRoutes); // Team Routes

app.use(handler)

app.listen(process.env.PORT, console.log(`Server is running on PORT: ${process.env.PORT.blue}`))