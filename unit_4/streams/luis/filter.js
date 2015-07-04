var stream = require('stream')

function Filter(options){
  stream.Transform.call(this, options)
}

Filter.prototype = Object.create(stream.Transform.prototype)
Filter.prototype.constructor = stream.Transform


Filter.prototype._transform = function (chunk, encoding, done) {
  var number = chunk.toString()
  if (number > 100) {
    this.push(number)
  }
  
  done()
}


module.exports = Filter
