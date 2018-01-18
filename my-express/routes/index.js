var express = require('express');
var router = express.Router();
var UserModel = require("../model/Users");
var md5 = require("md5");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录页面' });
});


router.get('/Backstage', function(req, res, next) {
     //判断用户是否登录，如果没登录跳转到login页面。（需要引用session组件）
     console.log(req.session);
     if(req.session == null || req.session.username == null) {
           // res.render('login', { title: '登录页面' });
           res.redirect("/login"); // 重定向
           return;
     }
     res.render('Backstage', {});
});


router.post('/api/login4ajax', function(req, res, next) {
     var username = req.body.username;
     var psw = req.body.psw;
     var yzm = req.body.yzm;
     var result = {
           code: 1,
           message: "登录成功"
     };
     console.log(username,psw)
     UserModel.find({username: username, psw:psw}, (err, docs)=>{
     	console.log(docs)
           if(docs.length == 0) {
                result.code = -101;
                result.message = "您的账号或密码错误。请重新登录。"
           } else {
                // 登录成功的时候，生成session
                req.session.username = username;
                console.log(req.session);
                
                
           }
           res.json(result);
     })
})



module.exports = router;
