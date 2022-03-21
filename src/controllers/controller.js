// controller.js

// index page
const home = async (req, res) => {
    res.json({ user: req.user})

    // res.render('front/home',{
        
    // });
}

module.exports =  {
    home
};