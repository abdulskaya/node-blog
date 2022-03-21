const { validationResult } = require('express-validator');
const User = require('../models/user');
const passport = require('passport');
require('../config/passport_local')(passport);

const register = (req, res) => {
    res.render('front/register');
}

const register_post = async (req, res, next) => {
    //res.json(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_errors', errors.array())
        let olds = {"fullname" : req.body.fullname, "email": req.body.email,  "username": req.body.username};
        req.flash('olds',olds);
        res.redirect('/register')
    }else{
        const user = await User.create({ email: req.body.email, username: req.body.username, fullname: req.body.fullname, password: req.body.password });
        req.flash('success','Kayıt başarılı, lütfen giriş yapınız.')
        res.redirect('/login')
    }
}

const login = (req, res) => {
    req.flash('success','Kayıt başarılı, lütfen giriş yapınız.')
    
    res.render('front/login');
}

const login_post = (req, res, next) => {
    req.flash('olds', {email: req.body.email});
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        badRequestMessage: 'Lütfen gerekli alanları doldurunuz',
        failureFlash: true,
    })(req, res, next);
    
}

const password_reset = (req, res) => {
    res.render('front/password_reset');
}

const password_reset_post = (req, res) => {
    
}

const logout = (req, res, next) => {
    req.logout();
    req.session.destroy((erroy) => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    })
}

module.exports = {
    register,
    register_post,
    login,
    login_post,
    password_reset,
    password_reset_post,
    logout
}