// controller.js

// index page
const home = async (req, res) => {
    res.render('front/home',{
        user: req.user , isAuth: req.isAuthenticated()
    });
}

module.exports =  {
    home
};