var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//add cors
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//login interceptor
app.use(function (req, res, next) {
  if(req.session.user){
    return next();
  }

  let permit = ['/user/login','/user/register','/failure','/','/*'];
  let req_url = req.url.split('?')[0];

  let isPermit = false;
  permit.forEach((value,key) => {
    let reg = new RegExp(value.replace("*",".*"),'ig');
    if(reg.test(value)){
      return isPermit = true;
    }
    if(req_url == value){
      return isPermit = true;
    }
  });
  if(isPermit){
    return next();
  }
  //console.info("========ok========");
  let message = '请先登录';
  let url = '/user/login';
  return res.redirect(`/failure?message=${message}&url=${url}`);
});

app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
