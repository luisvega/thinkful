var Alphabet = require('./alphabet')
var Cache = require('./cache')
var alpha = new Alphabet()
var cache = new Cache({ key: 'alpha1' })


/*
alpha.pipe(cache)

cache.on('finish', function() {
  console.log('cache store: ', Cache.store)
})

*/

alpha.on('data', function(chunk){
  console.log(chunk.toString());
})
