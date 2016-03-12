//CreateAccount.js

/*$(function(){
	$('#submitButton').click(function(){
		window.location.href='../index.html';
	});
});*/
var emailTrue = false;
//Regex Validation 
function validateUsername() {
	var feedback_user = document.getElementById('feedback_user');
	var reg = /^[a-z]{6,15}$/;
	if (reg.test(this.value) !== true) {
	feedback_user.textContent = 'Username minimum characters 6, maximum 18';
	} else {
	feedback_user.textContent = '';
	}
}
	var username = document.getElementById('username');
	username.addEventListener('blur', validateUsername, false);
	
function validateEmail() {
	
	var reg = /\S+@\S+\.\S+/;
	if(reg.test(this.value) === true){
		console.log("true");
		emailTrue = true;
	}else {
		console.log("false");
	}
}

var userEmail = document.getElementById('userEmail');
	userEmail.addEventListener('blur',validateEmail,false);