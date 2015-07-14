var http = require('http')
var express = require('express')
var socket_io = require('socket.io')


var app = express()
app.use(express.static('public'))

var server = http.Server(app)
var io = socket_io(server)

var wordToGuess

io.on('connection', function(socket){

  function setNewWord() {
    wordToGuess = WORDS[Math.floor(Math.random() * WORDS.length)]
    socket.emit('wordToDraw', { word: wordToGuess })
    console.log('wordToDraw')
  }
  console.log('client connected!')
  socket.on('draw', function(position){
    socket.broadcast.emit('draw', position)
  })
  socket.on('guess', function(guess){
    if (guess === wordToGuess) {
      console.log(guess)
      socket.broadcast.emit('guess', guess)
      socket.broadcast.emit('role', { role: 'guesser' })
      socket.emit('new drawer', guess)
      setNewWord()
    } else {
      socket.broadcast.emit('guess', guess)
    }

  })

  socket.on('role', function(role){
    socket.role = role
    if (role === 'drawer'){
      drawer = true
    }
    // http://bit.ly/1O2qkR4
    socket.broadcast.emit('role', { role: 'guesser' })
    setNewWord()
  })
})

var port = 8080
console.log('listening on ', port)
server.listen(port)



var WORDS = [
    "word", "letter", "number", "person", "pen", "class", "people",
    "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
    "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
    "land", "home", "hand", "house", "picture", "animal", "mother", "father",
    "brother", "sister", "world", "head", "page", "country", "question",
    "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
    "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
    "west", "child", "children", "example", "paper", "music", "river", "car",
    "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
    "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
    "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
    "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
    "space"
];
