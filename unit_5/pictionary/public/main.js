var pictionary = function() {
  var canvas, context;
  var socket = io();
  var drawing = false;
  var guessBox = $('#guess input');

  var onKeyDown = function(event) {
    if (event.keyCode != 13) {
      return;
    }
    /*
      example giving by thinkfule guessBox.value() doesn't seem to work
      had to change to guessBox.val()
    */
    var guess = guessBox.val();
    socket.emit('guess', guess);
    guessBox.val('');
  }

  guessBox.on('keydown', onKeyDown)
  socket.on('guess', function(attempt){
    $('#guesses').text(attempt)
  });

  var draw = function(position) {
    context.beginPath();
    context.arc(position.x, position.y, 6, 0, 2 * Math.PI);
    context.fill();
  };

  canvas = $('canvas');
  context = canvas[0].getContext('2d');
  canvas[0].width = canvas[0].offsetWidth;
  canvas[0].height = canvas[0].offsetHeight;
  canvas.on('mousedown', function(event){
    drawing = true;
  });
  canvas.on('mouseup', function(event){
    drawing = false;
  });
  canvas.on('mousemove', function(event){
    if(drawing) {
      var offset = canvas.offset();
      var position = { x: event.pageX - offset.left,
                       y: event.pageY - offset.top};
      socket.emit('draw', position)
      console.log(position)
      draw(position);
    }
  });
  socket.on('draw', function(position){
    draw(position)
  })
};





$(document).ready(function(){
  pictionary();

})
