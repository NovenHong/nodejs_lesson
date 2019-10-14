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

router.all("/",(req, res, next) => {
    let promise = new Promise((resolve,reject) => {
        connection.query("select * from user",[],(error,result) => {
            if(error){
                reject(error);
            }
            resolve(result);
        });
    });

    promise.then(result => {
        res.render('user/index', { title: '用户列表', data: result});
    }).catch(error => {
        res.send(error);
    });

});

router.all("/login",(req, res, next) => {
    if(req.method == 'POST'){
        let username = req.body.username;
        let password = req.body.password;

        if(!username){
            let message = '请输入用户名';
            return res.redirect(`/failure?message=${message}`);
        }

        if(!password){
            let message = '请输入用户密码';
            return res.redirect(`/failure?message=${message}`);
        }

        let params = [
            username,md5(password)
        ];

        let promise = new Promise((resolve,reject) => {
            connection.query("select * from user where username=? and password=?",params,(error,result) => {
                if(error){
                    reject(error);
                }
                resolve(result);
            });
        });

        promise.then(result => {
            if(result){
                req.session.user = result[0];
                let message = '用户登录成功';
                let url = '/';
                return res.redirect(`/success?message=${message}&url=${url}`);
            }else {
                let message = '用户登录失败';
                return res.redirect(`/success?message=${message}`);
            }
        }).catch(error => {
            res.send(error);
        });

    }else{
        res.render('user/login', { title: 'Login' });
    }

});

router.all("/register",(req, res, next) => {
    if(req.method == 'POST'){
        let username = req.body.username;
        let password = req.body.password;

        if(!username){
            let message = '请输入用户名';
            return res.redirect(`/failure?message=${message}`);
        }

        if(!password){
            let message = '请输入用户密码';
            return res.redirect(`/failure?message=${message}`);
        }

        let params = [
            username,md5(password),1,Date.now()
        ];

        let promise = new Promise((resolve,reject) => {
            connection.query("insert into user(username,password,status,createTime) values(?,?,?,?)",params,(error,result) => {
                if(error){
                    reject(error);
                }
                resolve(result);
            });
        });

        promise.then(result => {
            //console.info(result.insertId);
            if(result.insertId > 0){
                req.session.user = {
                    "id": result.insertId,
                    "username": username
                };
                let message = '用户注册成功';
                let url = '/';
                return res.redirect(`/success?message=${message}&url=${url}`);
            }else {
                let message = '用户注册失败';
                return res.redirect(`/success?message=${message}`);
            }
        }).catch(error => {
            res.send(error);
        });
    }else{
        res.render('user/register', { title: 'Register' });
    }

});

module.exports = router;
