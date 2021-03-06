const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

// Video 2:46:00
router.post('/users/signin', passport.authenticate('local', {
    // Si ya esta logeado, redireccionar a las notas
    successRedirect: '/notes',
    // Si no esta logeado, redireccionar al inicio de sesión
    failureRedirect: '/users/signin',
    //
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length === 0) {
        errors.push({ text: 'Please insert your name' });
    }
    if (email.length === 0) {
        errors.push({ text: 'Please insert your email' });
    }
    if (password !== confirm_password) {
        errors.push({ text: 'Password do not match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }
    if (errors.length > 0) {
        res.render('users/signup');
    } else {
        const emailUser = await User.findOne({ email: email }).lean();
        if (emailUser) {
            req.flash('error_msg', 'The Email is already in use');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');
        }
    }
});

// Video 2:58:
router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;