var events = require('events')

var progressBar = new events.EventEmitter()

progressBar.on('start', function(){
  var i = 0
  for(i = 1; i < 100; i++){
    if((i%10) === 0){
      this.emit('progress',i)
    }
  }
})

progressBar.on('progress', function(status){
  console.log(status + '% completed')
})

progressBar.on('stop', function(){
  console.log('100% completed!')
})

progressBar.emit('start')
progressBar.emit('stop')
