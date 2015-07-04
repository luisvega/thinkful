var Random = require('./random')
var Filter = require('./filter')
var Printer = require('./printer')

var random = new Random()
var filter = new Filter()
var printer = new Printer()


random.pipe(filter).pipe(printer)

/*
number.on('data', function(chunk){
  console.log(chunk.toString());
})

writable.on('pipe', function(src){
  console.log(src)
})


number.pipe(writable)
//number.pipe(process.stdout)
//alpha.pipe(cache)
/*
cache.on('finish', function() {
  console.log('cache store: ', Cache.store)
})
*/
