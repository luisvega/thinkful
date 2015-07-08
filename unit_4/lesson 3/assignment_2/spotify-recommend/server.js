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

var getTopTracks = function(artist, args){
  var emitter = new events.EventEmitter()
  var url = 'https://api.spotify.com/v1/artists/'+ artist +'/top-tracks'
  unirest.get(url)
         .qs(args)
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
      var completed = 0
      var checkComplete = function() {
        if (completed == artist.related.length) {
          res.json(artist)
        }
      }
      artist.related.forEach(function(relatedArtist, index){
        relatedTracks = getTopTracks(relatedArtist.id, { country: 'US' })
        console.log('index: '+index)
        console.log('completed: '+completed)
        relatedTracks.on('end', function(item){
            artist.related[index].tracks = item.tracks
        })
        relatedTracks.on('error', function(){
          res.sendStatus(404)
        })
        completed += 1
        //console.log(artist.related[3])
        checkComplete()
      })

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


// Top tracks
// GET https://api.spotify.com/v1/artists/{id}/top-tracks
