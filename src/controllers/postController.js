const { validationResult } = require('express-validator');
const Category = require('../models/category');
const Post = require('../models/post');
const PostCategory = require('../models/post_category');

const create_post = async (req, res) => {
    let categories = await Category.findAll({where: {is_active: 1}})
    res.render('front/post/create',{
        categories: categories
    });
}

const create_post_p = async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body.categories);
    if (!errors.isEmpty()) {
        
        req.flash('validation_errors', errors.array());
        let olds = {"post_title" : req.body.post_title, "content": req.body.content,  "categories": req.body.categories};
        req.flash('olds',olds);
        res.redirect('/create-post');
        
    }else{
        let categories = req.body.categories;
        console.log(req.body.categories);
        console.log(typeof req.body.categories);
        // check categories for user sends new categories
        const db_categories_obj = await Category.findAll({where: { is_active: 1}});
        let db_categories = [];
        db_categories_obj.forEach(element => {
            db_categories.push(element.title);
        });
        let differents = categories.filter(x => !db_categories.includes(x));
        if(typeof differents != 'undefined'){
            differents.forEach(element => {
                Category.create({ title: element, is_active: 1});
            }); 
        }
        const post = await Post.create({
            title:  req.body.post_title,
            post_face:  'post_faces/' + req.file.filename,
            content:  req.body.content,
            categories:  req.body.categories,
            author_id: req.user.id,
            is_active: 1,
        });
        
        categories.forEach(async element => {
            const category = await Category.findOne({
                where: {
                    title: element,
                    is_active: 1
                }
            });
            if(category){
                await PostCategory.create({
                    post_id: post.id,
                    category_id: category.id 
                });
            }
        });
        res.redirect('/');
    }
    
}


module.exports = {
    create_post,
    create_post_p
}