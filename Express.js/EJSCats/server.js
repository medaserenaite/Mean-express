var express = require("express");
var app = express();

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
   response.render('index');
})

app.get("/cats", function (request, response){
    response.render('cats');
})

app.get("/cats/1", function (request, response){
    var cats_array = [{name:"Pancakes", favfood:"Syrup", act:"scratching", thing:"wrapping paper"}];
    response.render('cat', {cats: cats_array});
})

app.get("/cats/2", function (request, response){
    var cats_array = [{name:"Midnight", favfood:"Hooman Soul", act:"scheming against humanity", thing:"wrapping paper"}];
    response.render('cat', {cats: cats_array});
})

app.get("/cats/3", function (request, response){
    var cats_array = [{name:"Charfield", favfood:"Lasagne", act:"modeling", thing:"hooman attention"}];
    response.render('cat', {cats: cats_array});
})


app.listen(8000, function() {
  console.log("listening on port 8000");
})