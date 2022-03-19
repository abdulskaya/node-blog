
//login page

const register = (req, res) => {
    res.render('front/register');
}

const register_post = (req, res) => {
    console.log(req.body);
    res.send('success');
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