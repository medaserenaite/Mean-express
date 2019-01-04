const express = require('express');
var path = require("path");

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded()); 
app.use(express.static(__dirname + "/public"));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("index");
});

var server = app.listen(8000, function() {
    console.log("Listening on port 8000");
})

var io = require('socket.io').listen(server);
var messages = []



io.sockets.on('connection', function (socket) {
    socket.emit('showMessages', messages);
    console.log("Client/socket is connected");
   
//server socket code below
    socket.on("joined", function (data) {
        io.emit("joined", data);
    }); 
    socket.on('newMessage', function(message){
        console.log(message)
        messages.push(messages);
        console.log(messages);
    })

    // socket.on("click_blue", function (data) {
    //     io.emit("update_background", {color : 'blue'})
    // });

    // socket.on("click_pink", function (data) {
    //     io.emit("update_background", {color : 'pink'})
    // });
});



