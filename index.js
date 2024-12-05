const express = require('express')
const app = express();
const connect = require('./database/connectDB');
const userRoutes = require('./routes/userRoutes');
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

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);

app.use(handler)

app.listen(process.env.PORT, console.log(`Server is running on PORT: ${process.env.PORT.blue}`))