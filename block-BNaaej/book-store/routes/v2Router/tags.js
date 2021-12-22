const express = require('express');
const router = express.Router();
const Tag = require('../../models/Tag');
const Book = require('../../models/Book');

/* list all tags */
router.get('/', (req, res, next) => {
    Tag.findAll({}, (err, tags) => {
        if(err) return next(err);
        res.status(200).json(tags);
    });
});

/* List Tags in ascending order */

/* List Tags in descending order */

// count books for each tag
router.get('/count', (req, res, next) => {
    //count books for each category
});
/* Filter Books by Tags [Refactor this route]*/
router.get('/id', (req, res, next) => {
    Book.findAll({tags: id}, (err, books) => {   //Refactor here 
        if(err) return next(err);
        res.status(200).json(books);
    });  
});

module.exports =router;