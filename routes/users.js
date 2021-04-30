const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');


router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    res.redirect('/register')
})


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;