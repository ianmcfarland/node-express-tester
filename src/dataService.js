var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var dbUrl = require('../config/database').url;
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
        })
    },

    getBook: function(id, callback) {
        var collection = db.collection('books');
        var bookId = new objectId(id);
        collection.find({ _id: bookId }).toArray( function (err, books) {
            callback(books);
        });
    }
};