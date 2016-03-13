//MainController.js - Controller which we'll use to communicate data to our view.


(function() {
	
	'use strict';
	
	angular
		.module('formlyApp')
		.controller('MainController', MainController);
		
	function MainController() {

        var vm = this;

    }
		
	function MainController(province) {
		
		var vm = this;
		
		//the model object that we referenced
		//on the element in index.html
		vm.rental = {};
		
		//an array of our form fields with configuration
		//and options set. We make reference to this in 
		//the 'fields' attribute on the element
		vm.rentalFields = [
			{
            key: 'first_name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'First Name',
                placeholder: 'Enter your first name',
                required: true
            }
        },
        {
            key: 'last_name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Last Name',
                placeholder: 'Enter your last name',
                required: true
            }
        },
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: 'Email address',
                placeholder: 'Enter email',
                required: true
            }
        },
		{
            key: 'password',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Password',
                placeholder: 'Enter password',
                required: true
            }
        },
		{
            key: 'confirm',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Confirm',
                placeholder: 'Enter password again',
                required: true
            },
			hideExpression: '!model.password'
        },
		{
			key: 'department',
			type: 'radio',
			templateOptions: {
				label: 'Department',
				required: true,
				//Call our province service to get a list
				//of provinces and territories
				options: province.getProvinces()
			},
			hideExpression: '!model.confirm'
		}
		];
	}
	
})();