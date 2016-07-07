//var router = require('express').Router();
var service = require('./dataService');

function route(app, passport) {
    
    app.get('/', function (req, res) {
       res.render('index', { loggedIn : req.user }); 
    });

    app.get('/books', function (req, res) {
            service.listBooks( function (books) {
                res.render('bookList', {books: books}); 
            });
        });

    app.get('/books/:id', function (req, res) {
            var id = req.params.id;
            service.getBook(id, function (results) {
                res.render('bookView', {book: results[0]});
            });
        });
    
    app.get('/signup', function(req, res) {
        res.render('signup', {message: req.flash('signupMessage') }); 
    });
//    app.post('/signup', passport.authenticate('local-signup', {
//        sucessRedirect : '/profile',
//        failureRedirect : '/signup',
//        failureFlash : true
//    }));
    app.post('/signup', function (req, res) {

        service.getUser(req.body.username, 
            function (err, user) {
                if (err) {
                    return res.render('signup', 
                        { message : 'Error signing up.' });
                }
            
                if (user) {
                    console.log('User already exists' + user);
                    return res.render('signup', 
                        { message : 'That user name is already taken.' });
                } else {
                    service.saveUser(req.body.username, req.body.password, 
                        function(err, user) {
                            console.log('Created user: ' + user);
                            req.login(user, function (err) {
                                if (err) { return next(err); }
                                return res.redirect('/profile');
                            });
                        }
                    );
                }
            }
        );
    });
    
    app.get('/login', function(req, res) {
        res.render('login', {message: req.flash('loginMessage') }); 
    });
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    );
};

function isLoggedIn(res, req, next) {
    if (req.isAuthenticated())
        return next();
    
    res.redirect('/');
}

module.exports = route;