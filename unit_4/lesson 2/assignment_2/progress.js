var Progress = function() {
  this.onStartCallback = null
  this.onProgressCallback = null
  this.onEndCallback = null
}

Progress.prototype.init = function (onStart, onProgress, onEnd) {
  console.log('start registered callback')
  this.onStartCallback = onStart
  this.onProgressCallback = onProgress
  this.onEndCallback = onEnd
};

Progress.prototype.start = function () {
  this.onStartCallback()
};

var progressBar = new Progress()
progressBar.init(function(status){
  console.log('Recieved OnStart callback')
  var i = 0
  for(i = 1; i < 100; i++) {
    if ((i % 10) === 0 ){
      this.onProgressCallback(i)
    }
  }
  this.onEndCallback()
}, function(status) {
  console.log(status + '% completed')
}, function(){
  console.log('100% completed!')
})

progressBar.start()
