const { validationResult } = require('express-validator');
const Category = require('../models/category');
const Post = require('../models/post');
const User = require('../models/user');
const PostCategory = require('../models/post_category');
const { Op } = require("sequelize");

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
        
    } else{
        
        // check categories for user sends new categories
        const db_categories_obj = await Category.findAll({where: { is_active: 1}});
        let db_categories = [];
        db_categories_obj.forEach(element => {
            db_categories.push(element.title);
        });
        
        let differents = [];
        if (typeof req.body.categories == 'string'){
            db_categories.forEach(element => {
                if (element != req.body.categories){
                    console.log(element);
                    differents.push(element)
                }
            });
        } else{
            differents = (req.body.categories).filter(x => !db_categories.includes(x));
        }
        
        if (typeof differents != 'undefined'){
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
            read_time: req.body.read_time,
            is_active: 1,
        });
        
        if (typeof req.body.categories == 'string'){
            const category = await Category.findOne({
                where: {
                    title: req.body.categories,
                    is_active: 1
                }
            });
            if (category){
                await PostCategory.create({
                    post_id: post.id,
                    category_id: category.id 
                });
            }
        } else{
            (req.body.categories).map(async element => {
                const category = await Category.findOne({
                    where: {
                        title: element,
                        is_active: 1
                    }
                });
                if (category){
                    await PostCategory.create({
                        post_id: post.id,
                        category_id: category.id 
                    });
                }
            });
        }
        
        res.redirect('/');
    }
    
}

const post_detail = async (req, res) => {
    const posts = await Post.findAll({
        where:{
            is_active: 1,
            [Op.not]: [
                { 
                    id: req.params.id 
                }
            ]
        },
        include: User
    });
    console.log(posts);
    const post = await Post.findOne({
        where: {
            id: req.params.id
        },
        include: [User,'Categories']
    })
    
    res.render('front/post/detail', {
        post: post,
        posts: posts
    });
}


module.exports = {
    create_post,
    create_post_p,
    post_detail
}