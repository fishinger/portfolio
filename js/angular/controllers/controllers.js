'use strict';

/* Controllers */

var app = angular.module('app', [
		'ui.router',
		'angular-parallax',
		'ngMaterial',
		'ngSanitize',
		'ngResource',
		'zumba.angular-waypoints'
	]);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$urlRouterProvider.otherwise('/');
	//$routeProvider.otherwise({redirectTo: '/'});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/pages/home.html'
			// views: {
			// 	'footer' : {
			// 		templateUrl: 'footer.html'
			// 	},
			// 	'content' : {
			// 		template: '<div>Content Home</div>'
			// 	}
			// }
			
		})
		.state('main', {
			url: '/',
			templateUrl: '/pages/main.html'
		})
		.state('phones', {
			url: '/phones',
			templateUrl: 'phones.html'
		})
		.state('cases', {
			url: '/cases',
			templateUrl: 'cases.html'
		})
		.state('today', {
			url: '/today',
			templateUrl: '/pages/today.html'
		})
		.state('test', {
			url: '/test',
			templateUrl: '/pages/test.html'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'about.html',
			controller: function($scope){
				$scope.items = [1,2,3,4];
			}
		})
		// .state('about.item', {
		// 	url: '/:item',
		// 	templateUrl: 'about.item.html',
		// 	controller: function($scope, $stateParams){
		// 		$scope.item = $stateParams.item;
		// 	}
		// })
})
app.run(function($rootScope, $urlRouter, $location, $state){

	$rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl){
		
		var path = $location.path().slice(1);
		console.log('changestart', path);
		if(path === ''){
			$rootScope.pageIndex = true;
		} else {
			$rootScope.pageIndex = false;
		}
		// if ($state.current.name !== 'main.exampleState' || newUrl === 'http://some.url' || oldUrl !=='https://another.url') {
	 //        // your stuff
	 //        $urlRouter.sync();
	 //      } else {
	 //        // don't sync
	 //      }
	 //    });
	 //    // Configures $urlRouter's listener *after* your custom listener
	 //    $urlRouter.listen();
	})

})

app.controller('mainCtrl', ["$scope", "$http", "$anchorScroll", "$location", "$timeout", function($scope, $http, $anchorScroll, $location, $timeout){
	$scope.test = 'safsadfsdffs';
	$timeout(function(){
		    var showSection = function(section, isAnimate){
				var hasSec = section.replace('#', '');
				if(hasSec && hasSec !=='/'){
					var 
						newSec = $('.section').filter('[data-section="' + hasSec + '"]'),
						posSec = newSec.offset().top - 40;
					if(isAnimate){
						$('html, body').animate({scrollTop: posSec}, 500);
					} else {
						$('html, body').scrollTop(posSec);
					}
				}
			}
			var activsection = function(){
				$('.section').each(function(e){
					var $this = $(this),
						topSec = $this.offset().top - 600,
						botSec = $this.height() + topSec,
						winScroll = $(window).scrollTop();
					if(topSec < winScroll && botSec > winScroll){
						var secId = $this.data('section'),
							activLink = $('.nav__link').filter('[href="#' + secId + '"]');
						$('.nav__link').removeClass('active');
						activLink.addClass('active');
						console.log('aadfdfd')
						$timeout(function(){
							//$location.hash(secId);
						}, 50)
					}
				})
			}
			$(window).scroll(function(){
				activsection();
			})
			$(document).ready(function(){
				showSection($location.hash(), false);
				$('.nav__link').on('click', function(e){
					e.preventDefault();
					showSection($(this).attr('href'), true);
				})
			})
	}, 300)
	    
	$scope.scrollTop = function(){
		$('html, body').animate({scrollTop: 0}, 500);
	}
	$scope.newSect = function(){
		var face = $('.face').height();
		$('html, body').animate({scrollTop: face}, 500);
	}
}]);

