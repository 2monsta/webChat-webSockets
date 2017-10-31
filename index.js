var express = require("express");
var http = require("http");
var app = express();
var socketio = require("socket.io");


app.use(express.static(__dirname + `/public`));




var users = []
var server = http.createServer(app);
server.listen(8080);
var io = socketio.listen(server);
//on connection from scripts.js 
io.on("connect", (data)=>{
	//do the following is after we connected with scripts.js
	// one of the events from scripts.js
	
	data.on("nameToServer", (dataName)=>{
		users.push(dataName);
		io.sockets.emit("nameToEveryone", users);
	})
})

