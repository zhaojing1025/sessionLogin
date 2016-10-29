/**
 * Created by ZhaoJing on 2016/10/29.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var uuid = require('uuid');
var app = express();
app.set('view engine','html');
app.engine('.html', require('ejs').__express);
app.set('views', path.resolve('views'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'admin'
}));
function checkLogin(req,res,next){
    if(req.session && req.session.username){
        next();
    }else{
        res.redirect('/login');
    }
}
app.get('/',function(req,res){
    res.render('/')
});
app.get('/login',function(req,res){
    res.render('login');
});
app.post('/login',function(req,res){
   var user = req.body;
    if(user.username === user.password){}
    req.session.username = user.username;
    res.redirect('/user');
});
app.get('/user',checkLogin,function(req,res){
    res.render('user',{username:req.session.username});
});

app.listen(8333);