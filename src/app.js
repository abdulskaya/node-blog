const express = require('express');
const app = express();
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const env = require('dotenv').config();
const db = require('./config/db');
const db_config = require('./config/config.json')
const session = require('express-session');
const flash = require('connect-flash');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require('passport')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const seqStore = new SequelizeStore({
    db: db,
});


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);

app.use(expressLayout);

app.set('view engine', 'ejs');

app.use(express.static('public')); 

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000,
        //expiration : 10 * 1000,
        checkExpirationInterval : 10 * 100
    },
    store: seqStore,
    proxy: false, //set true if you do SSL outside of node .
}));

seqStore.sync();

app.use(flash());

app.use( function (req, res, next) {
    res.locals.validation_errors =  req.flash('validation_errors');
    res.locals.olds =  req.flash('olds'); 
    res.locals.success =  req.flash('success'); 
    res.locals.error =  req.flash('error'); 
    next();
});

app.set('views',path.resolve(__dirname,'./views'));

app.set('layout', path.resolve(__dirname, 'views/front/layout'));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.set('views','views')

// Routes
app.use(require('./routes/routes'));

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, console.log("Server has started at port " + PORT));

