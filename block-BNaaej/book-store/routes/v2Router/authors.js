const express = require('express');
const router = express.Router();
const Book = require('../../models/Book');

/* List Books By Author */
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Book.findAll({author: id}, (err, books) => {
        if(err) return next(err);
        res.status(200).json(books);
    });
});


module.exports = router;