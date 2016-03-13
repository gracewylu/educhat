// scripts/province.js - We need a list of provinces and territories for part of our form and this is best
//						handled by using a service. Let's make a province.js file that has one method,
//						getProvinces, which is responsible for returning an array of province/territory objects:
						
(function(){

	'use strict'; //Forces JS to use a strict version?
	
	angular
		.module('formlyApp')
		.factory('province', province);
		
		function province(){
			function getProvinces() {
				return [
					{
                        "name": "Business",
                        "value":"business"
                    },          
                    {
                        "name":"Engineering",
                        "value":"Engineering"
                    },
					{
                        "name":"Nursing",
                        "value":"Nursing"
                    },
				];
			}
			return {
				getProvinces: getProvinces
			}
		}
})();