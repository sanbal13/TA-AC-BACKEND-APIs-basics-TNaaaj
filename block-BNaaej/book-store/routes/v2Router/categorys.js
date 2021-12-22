let express = require('express');
let router = express.Router();
let Category = require('../../models/Category');
let Book = require('../../models/Book');

/* Create a new category */
router.post('/new', (req, res, next) => {
    Category.create(req.body, (err, newCategory) => {
        if(err) return next(err);
        res.status(200).json(newCategory);
    });
});

/* Edit a category */
router.put('/:id', (req, res, next) => {
    const {id} = req.params;
    Category.findByIdAndUpdate(id, (err, updatedCategory) => {
        if(err) return next(err);
        res.status(200).json(updatedCategory);
    });
});

/* Delete a category */
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Category.findByIdAndDelete(id, (err, deletedCategory) => {
        if(err) return next(err);
        res.status(200).json(deletedCategory);
    });
});

// list all categories
router.get('/', (req, res,next) => {
    Category.find({}, (err, categories) => {
        if(err) return next(err);
        res.status(200).json(categories);
    });
});

// count books for each category
router.get('/count', (req, res, next) => {
    //count books for each category
});

// list books by category [Refactor this code]
router.get('/:id', (req, res, next) => {
    let { id } = req.params.id;
    Books.findAll({category: id}, (err, books) => { //refactor this part
        if(err) return next(err);
        res.status(200).json(books);
    });
});

module  .exports = router;
