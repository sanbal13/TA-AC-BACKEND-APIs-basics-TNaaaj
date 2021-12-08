const express = require('express');

const router = express.Router();
const Country = require('../models/Country');
const State = require('../models/State');

/* GET countries listing. */
/* Ascending Order */
router.get('/asc', (req, res, next) => {
  Country.find({})
    .sort({ name: 1 })
    .exec((err, countries) => {
      if (err) return next(err);
      return res.status(200).json(countries);
    });
});
/* Descending Order */
router.get('/desc', (req, res, next) => {
  Country.find({})
    .sort({ name: -1 })
    .exec((err, countries) => {
      if (err) return next(err);
      return res.status(200).json(countries);
    });
});

/* Create a Country */
router.post('/', (req, res, next) => {
  Country.create(req.body, (err, country) => {
    if (err) return next(err);
    return res.status(200).json({ message: 'County created successfully', country });
  });
});

/* Update a country */
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  Country.findByIdAndUpdate(id, req.body, (err, updatedCountry) => {
    if (err) return next(err);
    return res.status(200).json({ message: 'Country Updated', updatedCountry });
  });
});

/* Delete a country */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Country.findByIdAndDelete(id, (err, deletedCountry) => {
    if (err) return next(err);
    return res.status(200).json({ message: 'Country Deleted', deletedCountry });
  });
});

/* Add state to a country */
router.put(':/id/state', (req, res, next) => {
  const { id } = req.params;
  req.country = id;
  State.create(req.body, (err, state) => {
    if (err) return next(err);
    Country.findByIdAndUpdate(id, { $push: { state: state.id } }, (err, updatedCountry) => {
      if (err) return next(err);
      return res.status(200).json({ message: 'State added' }, state);
    });
  });
});

/* List all the states of a country */
router.get('/:id/state', (req, res, next) => {
  const { id } = req.params;
  Country.findById(id)
    .populate('state')
    .exec((err, country) => {
      if (err) return next(err);
      return res.status(200).json(country.state);
    });
});

/* List neighbouring countrys of a country */
router.get('/:id/neighbour', (req, res, next) => {
  const { id } = req.params;
  Country.findById(id, (err, country) => {
    if (err) return next(err);
    return res.status(200).json(country.neighbouring_countrys);
  });
});

/* List all religions present in entire country dataset */
router.get('/religions', (req, res, next) => {
  Country.find({}, (err, countries) => {
    if (err) return next(err);
    const religions = [];
    countries.forEach((country) => {
      religions.push(country.religion);
    });
    return res.status(200).json(religions);
  });
});

/* List countries based on religions */
router.get('/religion/:name', (req, res, next) => {
  const religion = req.params.name;
  Country.find({ religion }, (err, countries) => {
    if (err) return next(err);
    return res.status(200).json(countries);
  });
});

/* List countries based on continent */
router.get('/continent/:name', (req, res, next) => {
  const continent = req.params.name;
  Country.find({ continent }, (err, countries) => {
    if (err) return next(err);
    return res.status(200).json(countries);
  });
});

/* List countries based on population */
router.get('/population/:number', (req, res, next) => {
  const population = req.params.number;
  Country.find({ population }, (err, countries) => {
    if (err) return next(err);
    return res.status(200).json(countries);
  });
});

/* update a state from any country */
router.put('/:country/:state', (req, res, next) => {
  const { country } = req.params;
  const { state } = req.params;
  State.findByIdAndUpdate(state, req.body, (err, updatedState) => {
    if (err) return next(err);
    return res.status(200).json({ message: 'State Updated', updatedState });
  });
});

/* update a state from any country */
router.put('/:country/:state', (req, res, next) => {
  const { country } = req.params;
  const { state } = req.params;
  State.findByIdAndDelete(state, (err, deletedState) => {
    if (err) return next(err);
    // remove state id from country as well. 
    return res.status(200).json({ message: 'State Deleted', deletedState });
  });
});

module.exports = router;
