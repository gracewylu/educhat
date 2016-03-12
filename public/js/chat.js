$(".button-collapse").sideNav(); //instantiates sidenav

var rooms = document.getElementById('slide-out');

function addRoom(){

   //TODO: make sure to add the room to the database as well 
   var room_name = document.getElementById('room_name').value;

   $('div#room_links').append('<li><a href="?room_name=' + room_name+ '" class="white-text">'+room_name+'</a></li>'); //appends room to sidenav
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url.toLowerCase(); // This is just to avoid case sensitiveness  
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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

var room_name = getParameterByName('room_name');
document.getElementById('class_name').innerHTML = '<h1>' + room_name + '</h1>';
$(document).ready(function(){
   $('.modal-trigger').leanModal(); //allows modals to show
   init();
});
