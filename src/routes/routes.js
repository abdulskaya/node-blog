// routes.js

const express = require('express');
const { home } = require('../controllers/controller');
const { register, register_post, login, password_reset, login_post, logout } = require('../controllers/authController')
const {body, checkSchema, validationResult} = require('express-validator');
const {register_schema} = require('../middlewares/validatorMiddleware');
const checkAuth = require('../middlewares/checkAuth');
const router = express.Router();


router.get('/',checkAuth, home);

// auth routes
router.get('/register', checkAuth, register);
router.post('/register-post', [checkSchema(register_schema), checkAuth], register_post);
router.get('/login', checkAuth, login);
router.post('/login-post', checkAuth, login_post);
router.get('/password-reset', checkAuth, password_reset);
router.get('/logout', checkAuth, logout);

module.exports = router;