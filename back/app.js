import cors from 'cors';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
import { userRouter } from './routes/userRouter';
import { devateRouter } from './routes/devateRouter';
import { devatecommentRouter } from './routes/devatecommentRouter';
import { shareRouter } from './routes/shareRouter';

import { philosopherRouter } from './routes/philosopherRouter';
import { philosophercommentRouter } from './routes/philosopherCommentRouter';
import { freetopicRouter } from './routes/freetopicRouter';

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(userRouter);

app.use(devateRouter);
app.use(devatecommentRouter);
app.use(shareRouter);
app.use(philosopherRouter);
app.use(philosophercommentRouter);
app.use(freetopicRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // err 출력
  console.log('\x1b[33m%s\x1b[0m', err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
