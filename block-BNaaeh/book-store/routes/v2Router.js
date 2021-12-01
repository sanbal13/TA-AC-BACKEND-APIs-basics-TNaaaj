var express = require('express');
var router = express.Router();
const Book = require('../models/book');
const Comment = require('../models/comment');

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

// Comments
router.post(':id/comments', (req, res, next) => {
    const id = req.params.id;
    req.body.bookId = id;
    Comment.create(req.body, (err, comment) => {
        if(err) return next(err);
        Book.findByIdAndUpdate(id, {$push: {comments: comment.id}}, (err, updatedBook) => {
            if(err) return next(err);
            res.status(202).json(comment);
        });
    });

router.get(':id/comments', (req, res, next) => {
    const id = req.params.id;
    Book.findById(id)
                .populate('comments')
                    .exec ((err, book) => {
                         if(err) return next(err);
                         res.status(200).json(book.comments);       
        });
    });
});    
router.put('/comment/:id', (req, res, next) => {
    const id = req.params.id;
    Comments.findByIdAndUpdate(id, req.body, (err, updatedComment) => {
        if(err) return next(err);
        res.status(200).json(updatedComment);
    });
});
router.delete('/comment/:id', (req, res, next) => {
    const id = req.params.id;
    Comments.findByIdAndDelete(id, req.body, (err, deletedComment) => {
        if(err) return next(err);
        res.status(200).json(deletedComment);
    });
});



module.exports = router;
