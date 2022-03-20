const { validationResult } = require('express-validator');


const register = (req, res) => {
    res.render('front/register');
}

const register_post = (req, res, next) => {
    //res.json(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_errors', errors.array())
        let olds = {"fullname" : req.body.fullname, "email_adress": req.body.email_adress,  "username": req.body.username};
        req.flash('olds',olds);
        res.redirect('/register')
    }
    res.redirect('/')
    
}

const login = (req, res) => {
    
    
    res.render('front/login');
}

const login_post = (req, res) => {
    
}

const password_reset = (req, res) => {
    res.render('front/password_reset');
}

const password_reset_post = (req, res) => {
    
}

module.exports = {
    register,
    register_post,
    login,
    login_post,
    password_reset,
    password_reset_post
}