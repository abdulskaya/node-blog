const express = require('express');
const app = express();
const path = require('path');
const expressLayout = require('express-ejs-layouts');

// Set template engine configs
app.set('view engine', 'ejs');
//app.set('views','views')
app.use(express.static('public'));
app.use(expressLayout);
app.set('views',path.resolve(__dirname,'./views'))
// Routes
app.use('/', require('./routes/routes'));
app.set('layout', path.resolve(__dirname, 'views/front/layout'))

app.get('/test', (req, res) => {
    res.render('front/index',{
       //layout: './front/layout/index.ejs'
    })
})

app.get('/test2', (req, res) => {
    res.render('front/footer',{
       //layout: './front/layout/index.ejs'
    })
})

const PORT = 3000;
app.listen(PORT, console.log("Server has started at port " + PORT))