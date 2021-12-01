const express = require('express');
const router = express.Router();
const Book = require('../models/book');

/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.find({}, (err, books) => {
    if(err) return next(err);
    res.status(200).json(books);
  });
});
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Book.findOne(id, (err, book) => {
    if(err) return next(err);
    res.status(200).json(book);
  });
});
router.post('/', (req, res, next) => {
  Book.create(req.body, (err, createdBook) => {
    if(err) return next(err);
    res.status(200).json(createdBook);
  });
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, updatedBook) => {
    if(err) return next(err);
    res.status(200).json(updatedBook);
  });
});
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id, (err, deletedBook) => {
    if(err) return next(err);
    res.status(200).json(deletedBook);
  });
});


module.exports = router;
