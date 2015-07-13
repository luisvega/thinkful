$(document).ready(function() {
    var socket = io();
    var $usernameInput = $('.username')
    var $numberOfUsers = $('#numberOfUsers')
    var input = $('input');
    var messages = $('#messages');


    var username;

    $(function(){
      $('#chatPage').hide()
    })
    var addMessage = function(data) {
        console.log(data)
        messages.append('<div>' + data.user + ': '+ data.message+'</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
        if (username){
          var message = input.val();
          addMessage({message: message, user : username});
          socket.emit('message', message)
          input.val('');
        } else {
          setUsername();
        }
    });

    function setUsername() {
      username = $usernameInput.val().trim()
      $('#loginPage').fadeOut()
      $('#chatPage').show()
      socket.emit('addUser', username)
    }

    socket.on('login', function(data){
      var msg ='<br/><small>' + data.user + ' has connected</small><br /> There are ' + data.userCount + ' users connected'
      console.log('In login: ',data)
      messages.append(msg)
    })

    socket.on('userDisconnect', function(data){
      var msg ='<small>' + data.user + ' has disconnected<br /> There are ' + data.userCount + ' users connected</small><br/>'
      if (data.userCount > 0) {
        messages.append(msg)
      }

    })
    socket.on('message', addMessage)
});
