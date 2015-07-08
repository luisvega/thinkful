var stream = require('stream')

function Printer(options){
  stream.Transform.call(this, options)
}

Printer.prototype = Object.create(stream.Transform.prototype)
Printer.prototype.constructor = stream.Transform


Printer.prototype._write = function (number, encoding, done) {
  console.log(number.toString())
  done()
}


module.exports = Printer
