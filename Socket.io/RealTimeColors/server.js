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
io.sockets.on('connection', function (socket) {
    
    var background;

    socket.on("click_green", function (data) {
        io.emit("update_background", {color:"green"})
    }); 

    socket.on("click_blue", function (data) {
        io.emit("update_background", {color : 'blue'})
    });

    socket.on("click_pink", function (data) {
        io.emit("update_background", {color : 'pink'})
    });
});



