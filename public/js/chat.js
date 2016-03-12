$(".button-collapse").sideNav(); //instantiates sidenav

var rooms = document.getElementById('slide-out');

function addRoom(){

   //TODO: make sure to add the room to the database as well 
   var room_name = document.getElementById('room_name').value;

   $('div#room_links').append('<li><a href="#!" class="white-text">'+room_name+'</a></li>'); //appends room to sidenav
}

document.getElementById('add_room_button').addEventListener("click", addRoom, false);

function init(){
   var serverBaseUrl = document.domain;

   var socket = io.connect(serverBaseUrl);

   var sessionId = '';

   socket.on('connect', function(){
      sessionId = socket.io.engine.id;
      console.log('Connected ' + sessionId);
      socket.emit('newUser', {id: sessionId})
   });

   socket.on('userDisconnected', function(data){
      $('#' + data.id).remove();
   });

   socket.on('incomingMessage', function(data){
      var message = data.message; 
      $('#messages').append('<b>' + message + '<hr/>');
   });

   socket.on('error', function(reason){
      console.log('Unable to connect to server', reason);
   });

   function sendMessage(){
      var outgoingMessage = $('#message_input').val();
      $.ajax({
         url: '/message', 
         type: 'POST', 
         contentType: 'application/json', 
         dataType: 'json', 
         data: JSON.stringify({message: outgoingMessage})
      });
   }
   function messageInputKeyDown(event){
      if(event.which == 13){
         event.preventDefault();
         if($('#message_input').val().trim().length <= 0){
            return ;
         }
         sendMessage();
         $('#message_input').val('');
      }
   }
   function messageInputKeyUp(){
      var messageValue = $('#message_input').val();
      $('#send').attr('disabled', (messageValue.trim()).length > 0 ? false : true);
   }

   $('#message_input').on('keydown', messageInputKeyDown);
   $('#message_input').on('keyup', messageInputKeyUp);
   $('#send').on('click', sendMessage);
}
// var socketio = io.connect();
//       socketio.on("message_to_client",function(data) {
//          //Append an HR thematic break and the escaped HTML of the new message
//          document.getElementById("chatlog").appendChild(document.createElement("hr"));
//          document.getElementById("chatlog").appendChild(document.createTextNode(data['message']));
//       });
 
//       function sendMessage(){
//          var msg = document.getElementById("message_input").value;
//          socketio.emit("message_to_server", {message:msg});
//       }
 
 
$(document).ready(function(){
   $('.modal-trigger').leanModal(); //allows modals to show
   init();
});
