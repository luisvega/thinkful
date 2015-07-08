var unirest = require('unirest')
var express = require('express')
var events = require('events')

var getFromApi = function(endpoint, args){
  var emitter = new events.EventEmitter()
  unirest.get('https://api.spotify.com/v1/' + endpoint)
         .qs(args)
         .end(function(response){
           emitter.emit('end', response.body)
         })
  return emitter
}

var getRelatedArtists = function(artist) {
  var emitter = new events.EventEmitter()
  var url = 'https://api.spotify.com/v1/artists/'+ artist +'/related-artists'
  unirest.get(url)
         .end(function(response){
           emitter.emit('end', response.body)
         })
  return emitter
}

var app = express()
app.use(express.static('public'));

app.get('/search/:name', function(req, res){
  var searchReq = getFromApi('search',{
    q: req.params.name,
    limit: 1,
    type: 'artist'
  })
  searchReq.on('end', function(item){
    var artist = item.artists.items[0]

    if(item.artists.items.length === 0) {
      res.sendStatus(404)
      return
    }
    var relatedArtists = getRelatedArtists(artist.id)
    relatedArtists.on('end', function(item){
      artist.related = item.artists
      console.log(artist)
      res.json(artist)
    })
    relatedArtists.on('error', function(){
      res.sendStatus(404)
    })
  })
  searchReq.on('error', function(){
    res.sendStatus(404)
  })

})

app.listen(8080)

// search for artists:
// GET https://api.spotify.com/v1/search

// related-artists:
// GET https://api.spotify.com/v1/artists/{id}/related-artists
// GET https://api.spotify.com/v1/artists/6xTk3EK5T9UzudENVvu9YB/related-artists
