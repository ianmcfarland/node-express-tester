var express = require('express');

var server = express();
var port = process.env.PORT || 5000;

// "Middleware"
server.use(express.static('public'));
server.set('views', 'src/views');
server.set('view engine', 'ejs');

// Set up routes
var router = require('./src/routes');
server.use('/', router);

server.listen(port, function (err) {
    console.log('running server on port ' + port);
});