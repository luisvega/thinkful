var pictionary = function() {
  var canvas, context;
  var socket = io();
  var drawing = false;
  var guessBox = $('#guess input');
  var selector = $('#selector');
  var gameRole;
  var wordToDraw;
  var onKeyDown = function(event) {
    if (event.keyCode != 13) {
      return;
    }
    /*
      example given by thinkful guessBox.value() doesn't seem to work
      had to change to guessBox.val()
    */
    var guess = guessBox.val();
    socket.emit('guess', guess);
    guessBox.val('');
    $('#guesses').text(guess)
  }

  selector.on('change', function(){
    var selected = $(this).val();
    socket.emit('role', selected);
    if (selected === 'drawer') {
      gameRole = 'drawer'
      $('#register').hide();
      $('#meh').show();
      $('#guessOutput').show();
    }

  })
  socket.on('role', function(role){
    $('#register').hide();
    $('#meh').show();
    $('#guesser').show();
    $('#guessOutput').show();
    $('#wordToDraw').hide();
    gameRole = role
  })
  guessBox.on('keydown', onKeyDown)
  socket.on('guess', function(attempt){
    var attemptedWord
    $('#guesses').text(attempt)
  });

  socket.on('new drawer', function(data){
    gameRole = 'drawer'
    $('#guesser').hide();
    $('#wordToDraw').show();
    $('#meh').show();
    $('#guessOutput').show();
  })

  socket.on('wordToDraw', function(data){
    if(gameRole === 'drawer') {
      console.log(data)
      $('#wordToDraw').show();
      wordToDraw = data.word;
      $('#theWord').text(wordToDraw);
    }
  })
  var draw = function(position) {
    context.beginPath();
    context.arc(position.x, position.y, 6, 0, 2 * Math.PI);
    context.fill();
  };

  canvas = $('canvas');
  context = canvas[0].getContext('2d');
  context.clearRect(0,0,canvas.width,canvas.height)
  canvas[0].width = canvas[0].offsetWidth;
  canvas[0].height = canvas[0].offsetHeight;


  canvas.on('mousedown', function(event){
    if (gameRole === 'drawer') {
      drawing = true;
    }

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
