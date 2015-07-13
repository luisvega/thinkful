var express = require('express')
var socket_io = require('socket.io')
var http = require('http')

var app = express()
app.use(express.static('public'))

var server = http.Server(app)
var io = socket_io(server)

var users = {}
var userCount = 0



io.on('connection', function(socket){
  var addedUser = false;

  socket.on('message', function(message){
    console.log('on.message socket.username:', socket.username)
    socket.broadcast.emit('message',{message: message, user: socket.username})
  })

  socket.on('addUser', function(user){
    socket.username = user
    users[user] = user
    ++userCount
    addedUser = true
    socket.broadcast.emit('login', {
      user: user,
      userCount: userCount
    })
  })

  socket.on('typing', function(){
    socket.broadcast.emit('typing', {
      user: socket.username
    })
  })

  socket.on('disconnect', function(){
    if (addedUser) {
      delete users[socket.username]
      --userCount
    }
    socket.broadcast.emit('userDisconnect', {
      user: socket.username,
      userCount: userCount
    })
    console.log('disconnect: ',socket.username)
  })

})

server.listen(8080)
