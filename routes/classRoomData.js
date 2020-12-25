const express = require('express');           //使用express
const router = express.Router();               //放数据

const path = require('path');// 系统路径模块
const fs = require('fs'); // 文件模块

/* GET home page. */
router.get('/', function (req, res, next) {
  
  const file = path.join(__dirname, '../data/classRoomData.json'); //文件路径，__dirname为当前运行js文件的目录
  // const file = 'G:\\2020_StudyRecord\\ppsucTeam\\Express\\data\\classRoomData.json';
  
  //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径

//读取json文件
  fs.readFile(file, 'utf-8', function(err, data) {
      if (err) {
          res.send(err);
      } else {
          res.send(data);
      }
  });
});
module.exports = router;