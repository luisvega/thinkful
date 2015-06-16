var express = require('express')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var Storage = function() {
  this.items = []
  this.id = 0
}

Storage.prototype.add = function(name) {
  var item = {name: name, id: this.id}
  this.items.push(item)
  this.id += 1
  return item
}

Storage.prototype.delete = function(id) {
  var succeeded = false
  var position = -1
  this.items.forEach(function(item, index){
    if (item.id == id) {
      position = index
    }
  })
  if(position >= 0) {
    this.items.splice(position,1)
     succeeded = true
  } 
  return(succeeded)
}

Storage.prototype.update = function(id, name) {
  var position = -1
  this.items.forEach(function(item, index){
    if(item.id == id) {
      position = index
    }
  })
  if(position >= 0){
    this.items[position].name = name
    return this.items[position]
  } else {
    return this.add(name)
  }
}

var storage = new Storage()
storage.add('Broad beans')
storage.add('Tomatoes')
storage.add('Peppers')

var app = express()
app.use(express.static('public'))

app.get('/items', function(req, res){
  res.json(storage.items)
})

app.post('/items', jsonParser, function(req, res){
  if(!req.body) {
    return res.sendStatus(400)
  }
  var item = storage.add(req.body.name)
  res.status(201).json(item)
})

app.delete('/items/:id', jsonParser, function(req, res) {
  if(!req.body) {
    return res.sendStatus(400)
  }
  var id = req.params.id
  var status = storage.delete(id)
  var message = ''
  var response_code = 200
  if (!status) {
    message = 'Item not found'
    response_code = 204
    
  }

  res.status(response_code).json({ message: message })
})

app.put('/items/:id', jsonParser, function(req, res) {
  // Not sure if this is the best approach, or just use req.body
  var id = req.params.id
  var name = req.body.name
  var item = storage.update(id, name)
  res.status(201).json(item)
})


app.listen(process.env.PORT || 8080)

exports.app = app
exports.storage = storage
