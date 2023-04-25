const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const authRouter = require('./app/api/auth/router');
const categoriesRouter = require('./app/api/categories/router');
const booksRouter = require('./app/api/books/router');
const checkoutRouter = require('./app/api/checkout/router');
const transactionRouter = require('./app/api/transaction/router');
const URL = '/api/v1';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to ino ganteng world",
  });
});

app.use(`${URL}`, authRouter);
app.use(`${URL}`, categoriesRouter);
app.use(`${URL}`, booksRouter);
app.use(`${URL}`, checkoutRouter);
app.use(`${URL}`, transactionRouter);

module.exports = app;
