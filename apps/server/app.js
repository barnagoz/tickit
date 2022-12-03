const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const checkToken = require('./middlewares/checkToken');
const dbConnection = require('./dbConnection');
const reportsRouter = require('./routes/reports');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const generalRouter = require('./routes/general');
const pageRouter = require('./routes/page');
const groupRouter = require('./routes/group');

require('dotenv').config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(process.env.CORS));
app.use('/reports', checkToken.tokenValidator, reportsRouter);
app.use('/users', checkToken.tokenValidator, usersRouter);
app.use('/auth', authRouter);
app.use('/page', pageRouter);
app.use('/general', generalRouter);
app.use('/group', checkToken.tokenValidator, groupRouter);
dbConnection.connect();
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
