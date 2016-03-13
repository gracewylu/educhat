//CreateAccount.js

/*$(function(){
	$('#submitButton').click(function(){
		window.location.href='../index.html';
	});
});*/
var emailTrue = false;
//Regex Validation 

function validateFirst(){
	var feedback_first = document.getElementById('feedback_first');
	
}
function validateLast(){
	
	
}
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
	
//Password
function validatePassword() {
	var feedback_pass = document.getElementById('feedback_pass');
	var reg = /^[a-z]{8,20}$/; 
	if (reg.test(this.value) !== true) {
	feedback_pass.textContent = 'Password must be 8 characters and cannot exceed 20';
	} else {
	feedback_pass.textContent = '';
	}
}

	var elPassword = document.getElementById('userPassword');
	elPassword.addEventListener('blur', validatePassword, false);
	
function validateConfirm() {
	var feedback_confirm = document.getElementById('feedback_confirm');

	if (this.value !== elPassword.value) {
	feedback_confirm.textContent = 'Passwords must match';
	}
	else {
	feedback_confirm.textContent = '';
	}
}

	var elConfirm = document.getElementById('confirmPassword');
	elConfirm.addEventListener('blur', validateConfirm, false);
	
	
	//Validate	
/* The validateForm function makes sure the there is valid input
	in a form and only lets the user submit the form when the conidtions
	are met. */	
function validateForm(e){
	
	if(elPassword.value !== confirmPassword.value
	|| feedback_user.textContent !== ''
	|| feedback_pass.textContent !== ''
	){
		console.log("error");
		e.preventDefault();
		return false;
	}
	else {
		return true;
	}
	
	
}
var getForm = document.getElementById('authentication');
getForm.addEventListener('submit', validateForm, false);
//End Validate	




