const express = require('express');

const router = express.Router();

const Country = require('../models/Country');
const State = require('../models/State');

/* List all the States in ascending order of population */
router.get('/', (req, res, next) => {
  State.find({})
    .sort({ population: 1 })
    .exec((err, states) => {
      if (err) return next(err);
      return res.status(200).json({ states });
    });
});

/* List neighbouring states of a state */
router.get('/:id/neighbour', (req, res, next) => {
  const { id } = req.params;
  State.findById(id, (err, state) => {
    if (err) return next(err);
    return res.status(200).json(state.neighbouring_states);
  });
});


router.

module.exports = router;
