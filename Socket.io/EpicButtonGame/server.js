const express = require('express');
var path = require("path");
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded()); //{ extended: true }
app.use(express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var server = app.listen(8000, function() {
    console.log("Listening on port 8000");
})

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    
    var count = 0;

    socket.on("click_epic", function (data) {
        count +=1;
        socket.emit("update_count", {count : count} )
    }); 

    socket.on("click_reset", function (data) {
        count = 0;
        socket.emit("update_count", {count : count} )
    });
    
});



app.get("/", function (req, res) {
    res.render("index");
});

