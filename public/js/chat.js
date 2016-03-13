$(".button-collapse").sideNav(); //instantiates sidenav

var rooms = document.getElementById('slide-out');

function init(){
   var serverBaseUrl = document.domain;

   var socket = io.connect(serverBaseUrl);

   var sessionId = '';

   socket.on('connect', function(){
      sessionId = socket.io.engine.id;
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
   });

   socket.on("add_room_link", function(data){
      document.getElementById('class_name').innerHTML = '<h1>' + room_name + '</h1>';
   })
   socket.on('error', function(reason){
      console.log('Unable to connect to server', reason);
   });
   //add new room 
   function addRoom(){
      var room_name = $('#class').val();
      var department = $('#departments option:selected').val();
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
         console.log(data['class_name']);
      });
      $('div#room_links').append('<li><a href="#'+room_name+'" class="white-text">'+room_name+'</a></li>'); //appends room to sidenav
      $('#addroom_modal').closeModal();
   }
   function sendMessage(){
      var outgoingMessage = $('#message_input').val();
      $.ajax({
         url: '/message', 
         type: 'POST', 
         contentType: 'application/json', 
         dataType: 'json', 
         data: JSON.stringify({message: outgoingMessage, name: name})
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

   //list rooms in side nav 
   function listRooms(){
      $.get("/rooms", function(data){
        for(var i = 0; i < data.length; i++){
             $('div#room_links').append('<li><a href="#'+data[i]+'" class="white-text">'+data[i]+'</a></li>'); //appends room to sidenav
        }
      });
   }

//gets room name from url 
var href = window.location.href;
var room_name = href.substr(href.lastIndexOf('#')+1);

//window.alert(href.substr(href.lastIndexOf('#')+1));
document.getElementById('class_name').innerHTML = '<h1>' + room_name + '</h1>';


$(document).ready(function(){
   $('select').material_select();
   $('.modal-trigger').leanModal(); //allows modals to show
   $('#room_links a').click(function(){
      document.getElementById('class_name').innerHTML = '<h1>' + room_name + '</h1>';

   });
   init();
   listRooms();
});
