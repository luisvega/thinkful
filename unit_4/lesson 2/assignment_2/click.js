
var ControlPanel = function() {
    this.onClickCallback = null
}

ControlPanel.prototype.onClick = function (callback) {
  console.log('Registered click callback')
  this.onClickCallback = callback
}

ControlPanel.prototype.click = function (buttonCollor) {
  if(!this.onClickCallback) {
    //console.log('no cb')
    return
  }
  if (buttonCollor === 'green') {
    this.onClickCallback('All Okay')
  }
  else if (buttonCollor === 'red') {
    this.onClickCallback('Panic!1!')
  }
}

var controlPanel = new ControlPanel()
controlPanel.onClick(function(status){
  console.log('Received click callback')
  console.log(status)
})

controlPanel.click('green')
controlPanel.click('red')
