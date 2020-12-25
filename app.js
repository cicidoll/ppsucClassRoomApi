const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');// 系统路径模块
// const fs = require('fs'); // 文件模块
const bodyParser = require('body-parser'); // 对post请求的请求体进行解析模块
const app = express();// express框架模块

// app.use(bodyParser.urlencoded({ extended: false }));
//bodyParser.urlencoded 用来解析request中body的 urlencoded字符，只支持utf-8的编码的字符，也支持自动的解析gzip和 zlib。
//返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Client网址
const url = '*';
//跨域问题解决方面
const cors = require('cors');
app.use(cors({  
    origin:[url],
    // methods:['GET','POST'],
    methods:['GET']
}));
//跨域问题解决方面
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
　next();　
});


const classRoomData = require('./routes/classRoomData');
app.use('/v1/classRoomData', classRoomData);

const mobilizeBorrow = require('./routes/mobilizeBorrow');
app.use('/v1/mobilizeBorrow', mobilizeBorrow);

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
