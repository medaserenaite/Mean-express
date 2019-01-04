// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);

// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);

app.get('/', function(request, response) {
   console.log("The request object", request);
   console.log("The response object", response);
   response.send("<h1>Hello Express</h1>");
})
app.listen(8000, function() {
  console.log("listening on port 8000");
})

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get("/cars", function (request, response){
    response.render('cars');
})

app.get("/cats", function (request, response){
    response.render('cats');
})

app.get("/cars/new", function (request, response){
    response.render('form');
})
