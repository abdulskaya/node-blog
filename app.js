const express = require('express');
const app = express();

// Set template engine configs
app.set('view engine', 'ejs');
app.set('views','views')
app.use(express.static('public'));
// Routes
app.use('/', require('./routes/routes'));

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))