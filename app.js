const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes')
const cookieParser = require('cookie-parser');
const {checkUser} = require('./src/routes/middleware/authMiddleware');
const config = require('./config')
const app = express();

app.use(express.json());
app.use(cookieParser());
app.get('*', checkUser)

mongoose.connect(config.databaseUrl)
    .then((result) => app.listen(config.port,() =>{console.info(`Server is running at ${config.port}`)}))
    .catch((err) => console.log(err));

app.use(authRoutes);

