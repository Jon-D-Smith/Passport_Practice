//Express basic setup
const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path')
const methodOverride = require('method-override');
//Mongoose setup
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/passport_practice', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("mongoose connected"))
    .catch((err) => console.log('mongoose error', err))


const User = require('./models/user');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//passport middleware
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware for parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

const userRoutes = require('./routes/users')

app.use('', userRoutes)

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}`)
})