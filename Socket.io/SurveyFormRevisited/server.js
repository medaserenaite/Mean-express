const express = require('express');
var path = require("path");
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("index");
});
app.post("/", function(req, res){
    res.render('index');
});

var server = app.listen(8000, function() {
    console.log("Listening on port 8000");
})


var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    // console.log("Client/socket is connected!");
    // console.log("Client/socket id is: ", socket.id);

    socket.on('posting_form', function (data) {
    socket.emit('updated_message', { 
        response: "You emitted this info to the server:",
        info: data
     }); 
     socket.emit("random", {
        response: "Your lucky number emitted by the server is ",
        numb: Math.floor(Math.random()*1000)
    });
  });
    
});