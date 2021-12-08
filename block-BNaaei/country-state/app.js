const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/countries');

mongoose.connect(
  'mongodb://localhost/country-state',
  (err) => {
    console.log(`connected: ${!err}`);
  },
);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'process.env.SECRET',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/country-state' }),
}));
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
