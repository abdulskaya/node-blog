// routes.js

const express = require('express');
const { home } = require('../controllers/controller');
const { register, register_post, login, password_reset } = require('../controllers/authController')
const {body, checkSchema, validationResult} = require('express-validator');
const {register_schema} = require('../middlewares/validatorMiddleware');
const router = express.Router();


router.get('/', home);

// auth routes
router.get('/register', register);
router.post('/register-post', checkSchema(register_schema), register_post);
router.get('/login', login);
router.get('/password-reset', password_reset);

module.exports = router;