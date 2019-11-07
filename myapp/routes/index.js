var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5-node');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'test'
});
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  let params = ["%"+req.query.username+"%"];
  let promise = new Promise((resolve,reject) => {
    connection.query("select * from user where username like ?",params,(error,result) => {
      if(error){
        reject(error);
      }
      resolve(result);
    });
  });

  promise.then(result => {
    res.json(result);
  }).catch(error => {
    res.send(error);
  });

});

router.post('/',function (req, res, next) {
  let params = [req.body.username,req.body.id];

  let promise = new Promise((resolve,reject) => {
    connection.query("update user set username=? where id=?",params,(error,result) => {
      if(error){
        reject(error);
      }
      resolve(result);
    });
  });

  promise.then(result => {
    if(result.affectedRows > 0){
      res.json({"status":true});
    }else {
      res.json({"status":false});
    }
  }).catch(error => {
    res.json({"status":false});
  });

});

router.post('/login',function (req, res, next) {

  let params = [req.body.username,md5(req.body.password)];

  let promise = new Promise((resolve,reject) => {
    setTimeout(() => {
      connection.query("select * from user where username=? and password=? limit 1",params,(error,result) => {
        if(error){
          reject(error);
        }
        resolve(result);
      });
    },2000);
  });

  promise.then(result => {
    if(result.length > 0){
      res.json({"status":true,"data":result[0]});
    }else {
      res.json({"status":false});
    }
  }).catch(error => {
    res.send(error);
  });
});

router.delete('/:id',function (req, res, next) {
  let params = [req.params.id];
  let promise = new Promise((resolve,reject) => {
    connection.query("delete from user where id=?",params,(error,result) => {
      if(error){
        reject(error);
      }
      resolve(result);
    });
  });

  promise.then(result => {
    if(result.affectedRows > 0){
      res.json({"status":true});
    }else {
      res.json({"status":false});
    }
  }).catch(error => {
    res.json({"status":false});
  });
});

router.get('/exist', function(req, res, next) {
  let params = [req.query.username];
  let promise = new Promise((resolve,reject) => {
    connection.query("select * from user where username=? limit 1",params,(error,result) => {
      if(error){
        reject(error);
      }
      resolve(result);
    });
  });

  promise.then(result => {
    if(result.length > 0){
      res.json({"status":true});
    }else {
      res.json({"status":false});
    }
  }).catch(error => {
    res.json({"status":true});
  });

});

router.get('/test', function(req, res, next) {
  //let reg = new RegExp('/.*/','ig');
  //let flag = reg.test("/30");
  let str = "/*".replace("*",".*");
  res.send(str);
});

router.get("/success",(req, res, next) => {
  res.render('success', {
    title: '成功提示',
    message: req.query.message,
    url: req.query.url
  });
});

router.get("/failure",(req, res, next) => {
  res.render('failure', {
    title: '错误提示',
    message: req.query.message,
    url: req.query.url
  });
});

module.exports = router;
