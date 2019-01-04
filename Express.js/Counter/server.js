var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

var counter = 0;

app.get('/', function (req, res){
    counter++;
    res.render('index', {counter: counter});
});

app.post('/addTwo', function (req, res){
    counter ++;
    res.redirect('/');
});

app.post('/reset', function (req, res){
    counter = 0;
    res.redirect('/');
});

app.listen(8000, function() {
})