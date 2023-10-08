var http = require ("http");
var express = require("express");
var app = express();

app.set('view engine', 'ejs');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-type':'text/plain'});
    res.end('Hello world!');
}).listen(5000);

app.get('/', function(req,res){
    res.render('page/index');
})
app.get('/chat', function(req, res){
    res.render('page/chat');
})
app.listen(8080);
console.log('Loading...')