var LocalStrategy = require('passport-local').Strategy;
var service = require('../dataService');

function config(passport) {
    passport.serializeUser(function (user, done) {
        done(null, user._id); 
    });
    
    passport.deserializeUser(function (id, done) {
        service.getUserById(id, function (err, user) {
            console.log('deser id: ' + id + ', user: ' + user);
            done(err, user); 
        });
    });
    
    passport.use(new LocalStrategy(
        function (username, password, done) {
            service.getUser(username, 
                function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            message: 'Incorrect username.'
                        });
                    }
                    if (!service.validatePassword(user, password)) {
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    }
                
                    return done(null, user);
                });
        }
    ));
    
//    passport.use('local-signup', 
//        new LocalStrategy({
//            usernameField : 'username',
//            passwordField : 'password',
//            passReqToCallback : true // allows us to pass back the entire request to the callback
//        },
//        function (req, username, password, done) {
//        
//                service.getUser(username, function (err, user) {
//                    if (err) {
//                        console.log('Error retrieving user');
//                        return done(err);
//                    }
//
//                    if (user) {
//                        console.log('User exists');
//                        return done(null, false, req.flash('signupMessage', 'That user name is already taken.'));
//                    } else {
//                        console.log('Creating user');
//                        service.saveUser(username, password, function (err, newUser) {
//    //                        console.dir(newUser);
//    //                        console.log('done: ' + done);
//                            return done(err, newUser);
//                        });
//                    }
//                });
//        })
//    );
}

module.exports = config;