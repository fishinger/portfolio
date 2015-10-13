'use strict';

/* Controllers */

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'home.html'
		})
		.when('/cases', {
			templateUrl: 'cases.html'
		})
		.otherwise({
			redirectTo: '/'
		})
})

app.controller('mainCtrl', function($scope, $http){
	$scope.test = 'safsadfsdffs';
});
