var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,user: req.session.user});
});

router.get('/destroy', function(req, res, next) {
  req.session.destroy();
  res.send('destroy');
});

router.get('/session', function(req, res, next) {
  console.info(req.session.user);
  res.send('session');
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
