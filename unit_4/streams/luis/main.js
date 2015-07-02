var Number = require('./number')
var number = new Number()



number.on('data', function(chunk){
  console.log(chunk.toString());
})


//number.pipe(process.stdout)
//alpha.pipe(cache)
/*
cache.on('finish', function() {
  console.log('cache store: ', Cache.store)
})
*/
