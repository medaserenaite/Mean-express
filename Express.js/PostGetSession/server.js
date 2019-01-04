var express = require("express");
var app = express();

// app.HTTP_VERB('URL', function (req, res){});  // HTTP_VERB is either 'get' or 'post' etc...



app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');


// root route
app.get('/', function (req, res){
    res.render('index', {title: "my Express project"});
  });
  // route to process new user form data:copy
  app.post('/users', function (req, res){
    //code to add user to db goes here!
  })

  //------ REDIRECTING -----------

  // root route
app.get('/', function (req, res){
    res.render('index', {title: "my Express project"});
  });
  // route to process new user form data:
  app.post('/users', function (req, res){
    // code to add user to db goes here!
    // redirect the user back to the root route. 
    // All we do is specify the URL we want to go to:
    res.redirect('/');
  })

// ---------------- BODY PARSER -----------

  // require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));

//------------------- GET FORM DATA ----------

// route to process new user form data:
app.post('/users/1', function (req, res){
    console.log("POST DATA \n\n", req.body)
    //code to add user to db goes here!
    // redirect the user back to the root route.  
    res.redirect('/')
});


app.listen(8000, function() {
    console.log("listening on port 8000");
  })

  //------------ ID ----------

//   users/:id    //where :id is the id of a particular user.  HTTP method is GET
// Setting this up in Express is easy; in our server.js file we would just add the route:
//Any data you wish to pass via the URL must be indicated by a ':'.  It will then be available in the req.params object.
app.get("/users/:id", function (req, res){
    console.log("The user id requested is:", req.params.id);
    // just to illustrate that req.params is usable here:
    res.send("You requested the user with id: " + req.params.id);
    // code to get user from db goes here, etc...
});

//------------SESSION-----------------

//you have to install and require the express-session module first. Common use cases 
//include 'logging in' a user, and storing their 'user_id' into session to be able to 
//retrieve them from different routes.    

// new code:
var session = require('express-session');
// original code:
var app = express();
// more new code:
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.post('/users', function (req, res){
    // set the name property of session.  
    req.session.name = req.body.name;
    console.log(req.session.name);
    //code to add user to db goes here!
    // redirect the user back to the root route. 
    res.redirect('/');
});