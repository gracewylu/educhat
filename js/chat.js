$(".button-collapse").sideNav(); //instantiates sidenav

var rooms = document.getElementById('slide-out');

function addRoom(){

	//TODO: make sure to add the room to the database as well 
	var room_name = document.getElementById('room_name').value;

	$('div#room_links').append('<li><a href="#!" class="white-text">'+room_name+'</a></li>'); //appends room to sidenav
}

document.getElementById('add_room_button').addEventListener("click", addRoom, false);

$(document).ready(function(){
	$('.modal-trigger').leanModal(); //allows modals to show
});
