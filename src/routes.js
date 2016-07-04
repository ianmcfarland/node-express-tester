var router = require('express').Router();
var service = require('./dataService');


router.get('/', function (req, res) {
   res.render('index'); 
});

router.route('/books')
    .get( function (req, res) {
        service.listBooks( function (books) {
            res.render('bookList', {books: books}); 
        });
    });

router.route('/books/:id')
    .get(function (req, res) {
        var id = req.params.id;
        service.getBook(id, function (results) {
            res.render('bookView', {book: results[0]});
        });
    });

module.exports = router;