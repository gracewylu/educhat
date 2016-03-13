$(".button-collapse").sideNav(); //instantiates sidenav


   var randnum = Math.random();
   randnum = randnum.toString();
   
   var randomId = randnum.substr(randnum.length - 5);

var rooms = document.getElementById('slide-out');

function init(){
   var serverBaseUrl = document.domain+":8080";

   var socket = io.connect(serverBaseUrl);

   var sessionId = '';

   socket.on('connect', function(){
      sessionId = socket.io.engine.id;
      socket.emit('newUser', {id: sessionId})
   });

   socket.on('userDisconnected', function(data){
      $('#' + data.id).remove();
   });
   
//Recieve messages from the top of the DOM
   socket.on('incomingMessage', function(data){
      var message = data.message; 
      var name = 'Anonymous' + randomId + ': '; 
      var date = new Date();
      var year = date.getFullYear();
      var day = date.getDate();
      var month = date.getMonth();
             var hour = date.getHours();
             var mins = date.getMinutes();
             var secs = date.getSeconds();
             var full_date = hour + ':' + mins + ':'+ secs + '  ' + month + '/' + day + '/' + year;
            $('#messages').prepend('<b><span class="blue-text text-darken-2">' + full_date + ' ' + name + "</span></b>" + message + '<hr/>');
   });

   socket.on('addedRoom', function(data){
      var room = data.room; 
      var dept = data.dept; 
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
      var exists = true;

      $.ajax({
        url: '/roomExists',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
           room: room_name 
        }),
        
      }).success(function(data){
         if (data.length != 0){
             exists = false;
         } 
      $.ajax({
         url: '/room/'+room_name, 
         type: 'POST', 
         contentType: 'application/json', 
         dataType: 'json', 
         data: JSON.stringify({
             room: room_name, 
             dept: department
          })
      });

      setTimeout(function() {
        if (exists){
         console.log(exists);
         $.ajax({
          url: '/room/'+room_name, 
          type: 'POST', 
          contentType: 'application/json', 
          dataType: 'json', 
             data: JSON.stringify({
              room: room_name, 
              dept: department}) 
        });
         $('div#room_links').append('<li><a href="#'+room_name+'" class="white-text sidebar-links">'+room_name+'</a></li>'); //appends room to sidenav
         $('#addroom_modal').closeModal();

      }else {
          Materialize.toast('Dude, we need a unique class:(', 6000);
      }

      }, 2000)
}

   function sendMessage(){
      var outgoingMessage = $('#message_input').val();
      var href = window.location.href;
      var room_name = href.substr(href.lastIndexOf('#')+1);
      $.ajax({
         url: '/message', 
         type: 'POST', 
         contentType: 'application/json', 
         dataType: 'json', 
         data: JSON.stringify({message: outgoingMessage, name: name, room: room_name})
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
   $('.sidebar-links').on('click', enterRoom);
}

   //list rooms in side nav 
   function listRooms(){
      $.get("/rooms", function(data){
        for(var i = 0; i < data.length; i++){
             $('div#room_links').append('<li><a href="#'+data[i]+'" class="white-text sidebar-links">'+data[i]+'</a></li>'); //appends room to sidenav
        }
      });
   }


   //grabs room from url and sends it to server through POST
   function enterRoom(room){
      //gets room name from url 
      $('#messages').empty();
      $.ajax({
         url: '/getroom', 
         type: 'POST', 
         contentType: 'application/json', 
         dataType: 'json', 
         data: JSON.stringify({
            room_name: room
         })
      }).success(function(data){
         $.each(data, function(index, val){
             var name = 'Anonymous' + randomId + ': '; 
             var date = val.created;
             date = new Date(date);
             var year = date.getFullYear();
             var day = date.getDate();
             var month = date.getMonth();
             var hour = date.getHours();
             var mins = date.getMinutes();
             var secs = date.getSeconds();
             var full_date = hour + ':' + mins + ':'+ secs + '  ' + month + '/' + day + '/' + year;
            $('#messages').prepend('<b><span class="blue-text text-darken-2">' + full_date + ' ' + name + "</span></b>" + val.content + '<hr/>');
         });
      });

   }

//gets room name from url 
var href = window.location.href;
var room_name = href.substr(href.lastIndexOf('#')+1);


//window.alert(href.substr(href.lastIndexOf('#')+1));
document.getElementById('class_name').innerHTML= '<h1 style="padding-left: 100px; padding-top: 250px;">Pick a class!</h1>';


$(document).ready(function(){
   $('footer').hide();
   $('select').material_select();
   $('.modal-trigger').leanModal(); //allows modals to show
    $(document).on("click", ".sidebar-links", function(){
      $('footer').show();
       $("#class_name").html("<h2>" + $(this).text() + "</h2>");
       enterRoom($(this).text());

   });
   init();
   listRooms();
});
