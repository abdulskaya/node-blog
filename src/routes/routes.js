// routes.js
const express = require('express');
const {home, profile} = require('../controllers/controller');
const {register, register_post, login, password_reset, login_post, logout} = require('../controllers/authController')
const {create_post,create_post_p, post_detail} = require('../controllers/postController');
const {body, checkSchema, validationResult} = require('express-validator');
const {register_schema, create_post_schema} = require('../middlewares/validatorMiddleware');
const checkAuth = require('../middlewares/checkAuth');
const multer = require('../config/multer');
const router = express.Router();

router.get('/',checkAuth, home);

// auth routes
router.get('/register', checkAuth, register);
router.post('/register-post', [checkSchema(register_schema), checkAuth], register_post);
router.get('/login', checkAuth, login);
router.post('/login-post', checkAuth, login_post);
router.get('/password-reset', checkAuth, password_reset);
router.get('/logout', checkAuth, logout);

// profile routes
router.get('/profile', checkAuth, profile);
// post routes
router.get('/create-post',[checkAuth], create_post)
router.post('/create-post-p',[multer.single('post_face'),checkSchema(create_post_schema),checkAuth], create_post_p)
router.get('/post/:id',checkAuth, post_detail);

module.exports = router;