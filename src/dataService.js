var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt-nodejs');

var dbUrl = require('./config/database').url;
var db;

MongoClient.connect(dbUrl, function(err, database) {
    if (err) {
        console.log('Error connecting to database: ' + err);
        throw err;
    } else {
        console.log('Connected to URL: ' + dbUrl);
        db = database;
    }
});

module.exports = {
    
    listBooks: function (callback) {
        var collection = db.collection('books');
        collection.find({}).toArray(function (err, books){
            callback(books);
        });
    },

    getBook: function(id, callback) {
        var collection = db.collection('books');
        var bookId = new objectId(id);
        collection.find({ _id: bookId }).toArray( function (err, books) {
            callback(books);
        });
    },
    
    saveUser: function (username, password, callback) {
        var collection = db.collection('users');
        collection.insertOne(
            {
                username: username, 
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
            },
            function(err, result) {
                callback(null, result.ops[0]);
            }
        );
    },
    
    getUser: function (name, callback) {
        var collection = db.collection('users');
        collection.findOne(
            { username: name }, 
            function (err, user) {
                //console.dir(user);
                callback(err, user);
            }
        );
    },
    
    getUserById : function (id, callback) {
        var collection = db.collection('users');
        var userId = new objectId(id);
        collection.findOne( {_id : userId }, 
            function (err, result) {
                callback(err, result);
            }
        );
    },
    
    validatePassword : function (user, password) {
        return bcrypt.compareSync(password, user.password);
    }
};