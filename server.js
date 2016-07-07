var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var server = express();
var port = process.env.PORT || 5000;

// "Middleware"
server.use(express.static('public'));
server.use(cookieParser()); // read cookies (needed for auth)
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.set('views', 'src/views');
server.set('view engine', 'ejs');

server.use(session({ 
    secret : 'weaselthumpersecretpomegranet',
    resave : true,
    saveUninitialized : true
})); // session secret
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

// set up Passport strategy
require('./src/config/passport')(passport);

// Set up routes
var router = require('./src/routes')(server, passport);
//server.use('/', router);

server.listen(port, function (err) {
    console.log('running server on port ' + port);
});