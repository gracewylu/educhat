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
			key: 'under25',
			type: 'checkbox',
			templateOptions: {
				label: 'Are you under 25?',
			},
			//Hide this field if we don't have any valid input in the email field
			hideExpression: '!model.email'
		},
		{
			key: 'province',
			type: 'select',
			templateOptions: {
				label: 'Province/Territory',
				//Call our province service to get a list
				//of provinces and territories
				options: province.getProvinces()
			},
			hideExpression: '!model.email'
		},
		{
        key: 'insurance',
        type: 'input',
        templateOptions: {
            label: 'Insurance Policy Number',
            placeholder: 'Enter your insurance policy number'
        },
        hideExpression: '!model.under25 || !model.province',
    }
		];
	}
	
})();