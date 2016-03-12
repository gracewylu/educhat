$(".button-collapse").sideNav(); //instantiates sidenav

var rooms = document.getElementById('slide-out');

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

   socket.on('addedRoom', function(data){
      var room = data.room; 
      var dept = data.dept; 
      var admin = data.admin; 
      var password = data.password;
   })
   socket.on('error', function(reason){
      console.log('Unable to connect to server', reason);
   });

   function addRoom(){
      var room_name = $('#class').val();
      var department = $('#dept').val();
      var adminstrator = $('#admin').val();
      var pass = $('#password').val();
      $.ajax({
         url: '/room/'+room_name, 
         type: 'POST', 
         contentType: 'application/json', 
         dataType: 'json', 
         data: JSON.stringify({
             room: room_name, 
             dept: department, 
             admin: adminstrator,
             password: pass})
      }).success(function(){
         console.log("On success");
      });
      $('div#room_links').append('<li><a href="#!" class="white-text">'+room_name+'</a></li>'); //appends room to sidenav
   }

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
   $('#add_room_button').on('click', addRoom);
}

var room_name = getParameterByName('room_name');
document.getElementById('class_name').innerHTML = '<h1>' + room_name + '</h1>';
$(document).ready(function(){
   $('select').material_select();
   $('.modal-trigger').leanModal(); //allows modals to show
   init();
});
