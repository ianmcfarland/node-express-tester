var express = require('express');

var app = express();
var port = process.env.PORT || 5000;

// "Middleware"
app.use(express.static('public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');

// Set up routes
var router = require('./src/routes');
app.use('/', router);

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});