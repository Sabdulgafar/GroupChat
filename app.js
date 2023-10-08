var http = require ("http");
var express = require("express");
var app1 = express();
var app2 = express();

app1.set('view engine', 'ejs');
app2.set('view engine', 'ejs');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-type':'text/plain'});
    res.end('Hello world!');
}).listen(5000);

app1.get('/', function(req,res){
    res.render('page/index');
})
app2.get('/', function(req,res){
    res.render('page/chatboard');
})
app1.get('/chat', function(req, res){
    res.render('page/chat');
})
app2.get('/chat', function(req, res){
    res.render('page/chatboard');
})
app1.listen(8080);
app2.listen(9090);
console.log('Loading...')