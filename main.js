var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var path = require('path');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add the middlewares
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json()); // body-parser 於 Express 4 改為內建選項
app.use(express.urlencoded({ extended: false })); // body-parser 於 Express 4 改為內建選項
app.use(express.static(path.join(__dirname, 'public')));

// handle CORS problems
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;