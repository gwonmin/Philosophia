<<<<<<< HEAD

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const devateRouter = require('./routes/devateRouter');
=======
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
import { userRouter } from './routes/userRouter';
>>>>>>> 943f93f10a06b00131bc9609a25114296d3c015e

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

<<<<<<< HEAD
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(devateRouter);
=======
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(userRouter);
>>>>>>> 943f93f10a06b00131bc9609a25114296d3c015e

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // err 출력
  console.log("\x1b[33m%s\x1b[0m", err);

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
