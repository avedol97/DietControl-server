const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

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


const dbURI = 'mongodb+srv://test:test@cluster0.df9w6.mongodb.net/diet-control';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000,() =>{console.log("Working")}))
    .catch((err) => console.log(err));

app.use(authRoutes);

