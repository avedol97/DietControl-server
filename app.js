const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const config = require('./config')
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine','ejs');

app.get('*', checkUser)

app.get('/',requireAuth, (request, respond) => {
    respond.send('Hello Node!')
})
app.get('/test', requireAuth, (req, res) => res.render('test'));

mongoose.connect(config.databaseUrl)
    .then((result) => app.listen(config.port,() =>{console.info(`Server is running at ${config.port}`)}))
    .catch((err) => console.log(err));

app.use(authRoutes);

