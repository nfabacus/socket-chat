// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
// users = [];
// connections = [];
//
// server.listen(process.env.PORT || 3000);
// console.log('Server running...');
//
// app.get('/', function(req, res){
//   res.sendFile(__dirname+'/index.html');
// });
//
// io.sockets.on('conection', function(socket){
//   connections.push(socket);
//   console.log('connected: %s sockets connected',connections.length);
//
// // disconnect
// socket.on('disconnect', function(data){
//   connections.splice(connections.indexOf(socket),1);
//   console.log('Disconnected: %s sockets connected', connections.length);
// });
// });

var app = require('express')();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

var io = require('socket.io')(http);
users = [];
connections = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  connections.push(socket);
  console.log('connected: %s socket(s) connected',connections.length);

  // disconnect
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected: %s socket(s) connected', connections.length);
  });

  // Send Message
  socket.on('send message', function(data){
    io.sockets.emit('new message', {msg: data});
  });
});


http.listen(port, function(){
  console.log('listening on port ', port);
});
