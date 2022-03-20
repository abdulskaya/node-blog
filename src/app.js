const express = require('express');
const app = express();
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const env = require('dotenv').config();
const db = require('./config/db');
const db_config = require('./config/config.json')
const session = require('express-session');
const flash = require('connect-flash');
var SequelizeStore = require("connect-session-sequelize")(session.Store);

var seqStore = new SequelizeStore({
    db: db,
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10000
    },
    store: seqStore,
    proxy: false, //set true if you do SSL outside of node .
}));

seqStore.sync();

app.use(flash());

app.use( function (req, res, next) {
    res.locals.validation_errors =  req.flash('validation_errors');
    res.locals.olds =  req.flash('olds'); 
    next();
});


app.set('view engine', 'ejs');

//app.set('views','views')

app.use(express.static('public')); 

app.use(expressLayout);

app.use(express.urlencoded({extended: true}));

app.set('views',path.resolve(__dirname,'./views'));

// Routes
app.set('layout', path.resolve(__dirname, 'views/front/layout'));

app.use(require('./routes/routes'));

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, console.log("Server has started at port " + PORT));