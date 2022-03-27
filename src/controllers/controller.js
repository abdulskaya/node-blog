// controller.js

const Post = require('../models/post');

// index page
const home = async (req, res) => {
    let posts = await Post.findAll({
        where: {
            is_active: 1
        },
        order: [
            ['createdAt', 'DESC'],
        ],
    });

    res.render('front/home',{
        user: req.user, 
        isAuth: req.isAuthenticated(),
        posts: posts
    });
}

const profile = (req, res) => {
    res.render('front/profile');
}

module.exports =  {
    home,
    profile
};