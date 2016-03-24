var app = angular.module('app');
app.controller('test', function($scope, $sanitize){
	var users = [
		{
			name: 'Ivan',
			email: 'ivan@id.df',
			age: 14
		},
		{
			name: 'Petr',
			age: 19,
			email: 'petr@df.aa'
		},
		{
			name: 'Sergey',
			age: 25,
			email: 'petr@df.aa'
		},
		{
			name: 'Vasiliy',
			age: 27,
			email: 'petr@df.aa'
		},
		{
			name: 'Semeon',
			age: 20,
			email: 'petr@df.aa'
		},
		{
			name: 'Roman',
			age: 17,
			email: 'petr@df.aa'
		}
	]
	var list = [
		{
			id: 1,
			price: "12.2$"
		},
		{
			id: 2,
			price: "$5.24"
		},
		{
			id: 3,
			price: "7.73"
		}
	];
	this.getList = function(){
		return list;
	}
	this.getUsers = function(){
		return users;
	}
	$scope.type = 'application';
	$scope.region = 'ural';

	this.mode = this.getList()[0];

	/*валидация*/
	this.errorStatus = false;
	this.formSubmit = function(user, isvalid){
		
		if(isvalid){
			console.log('submit true');
		} else {
			this.errorStatus = true;
		}
	}
	this.errorMessage = function(error){
		if(angular.isDefined(error)){
			if(error.required){
				return 'Поле должно быть заполнено'
			} if(error.email){
				return 'Поле заполнено некорректно'
			}
		}
	}
	/*end*/
})
app.run(function($templateCache){
	$templateCache.put('red', '<div id="red"></div>')
})

app.filter('testFilter', function(){
	return function(str){
		var last = str.slice(-1),
			first = str.slice(0, 1),
			newText;
		if(last === '$'){
			newText = str.slice(0, str.length - 1);
			return '$' + newText
		} else if(first === '$'){
			return str
		} else {
			return '$' + str
		}
	}
})
app.directive('wrapIn', function($templateCache){
	return {
		//transclude: true,
		transclude: 'element',
		// scope: {
		// 	att: '@',
		// 	reg: '=',
		// 	fun: '&'
		// },
		//template: 'This is {{att}} <div>{{reg}}</div><button ng-click="fun()">run</button>',
		//templateUrl: 'red.html',
		link: function(scope, element, attr, ctrl, transclude){
			// scope.att = 'pohod';
			// scope.reg = 'sibir';
			var template = $templateCache.get(attr.wrapIn);
			var	tempalateElement = angular.element(template);
			transclude(scope, function(clone){
				element.after(tempalateElement.append(clone))
			})
			// transclude(scope, function(clone, scope){
			// 	element.append(clone)
			// })
		}
	}
})
app.directive('outCode', function(){
	return {
		compile: function(elem){
			var escape = function(content){
				return content
							.replace(/\</g, '&lt')
							.replace(/\>/g, '&gt')
							.replace(/\[u\]([\s\S]*)\[\/u\]/gim, '<u>$1</u>')
							//.replace(/([\s\S]*)/gim, '<div>$1</div>')
			}
			var wrapper = angular.element('<pre class="prettyprint"></pre>'),
				content = prettyPrintOne(escape(elem.html()));
			wrapper.append(content);
			elem.replaceWith(wrapper);
		}
	}
})

//обмен данными между контроллерами
app.controller('parentCtrl', function($rootScope, $scope){
	$scope.name = 'Petr';
	$scope.rename = function(){
		$rootScope.$broadcast('renameParent', {
			newName: $scope.name
		})
	}
	$scope.$on('renameChild', function(event, obj){
		//event.stopPropagation();
		$scope.name = obj.newName;
	})
})
app.controller('parentCtrl2', function($rootScope, $scope){
	$scope.name = 'Ivan';
	$scope.$on('renameParent', function(event, obj){
		$scope.name = obj.newName;
	})
})
app.controller('childCtrl', function($rootScope, $scope){
	//this.property = 'Цена';
	$scope.name = 'Sergey';
	$scope.rename = function(){
		$scope.$emit('renameChild', {
			newName: $scope.name
		})
	}
})

//Обновление данных при использовании сторонних скриптов
app.controller('testScript', function($scope){

	$(document).ready(function(){
		$("#jqueryUi").button().click(function(){
			//angular.element(testScript).scope() //вызываем скоуп эелемента с id testScript
			angular.element(testScript).scope().$apply('onCount()')
		})
	})

	$scope.testScript = true;
	$scope.incriment = 0;

	$scope.onCount = function(){
		$scope.incriment++
	}

	$scope.$watch('statusBtn', function(val){
		$('#jqueryUi').button({
			disabled: val
		})
	})
})
app.controller('testFilter', function($scope){
	var users = [
		{
			name: 'Ivan',
			email: 'ivan@id.df',
			age: 25,
			skill: 28
		},
		{
			name: 'Petr',
			age: 19,
			email: 'petr@df.aa',
			skill: 10
		},
		{
			name: 'Sergey',
			age: 15,
			email: 'petr@df.aa',
			skill: 25
		},
		{
			name: 'Vasiliy',
			age: 27,
			email: 'petr@df.aa',
			skill: 17
		},
		{
			name: 'Semeon',
			age: 20,
			email: 'petr@df.aa',
			skill: 14
		},
		{
			name: 'Roman',
			age: 17,
			email: 'petr@df.aa',
			skill: 18
		}
	]
	$scope.getUsers = function(){
		return users;
	}
	$scope.filterRoman = function(user){
		return user.name == "Roman"
	}
	$scope.limitSkill = function(user){
		return user.skill < 20 ? 0 : user.age;
	}
})
app.filter('maRegistr', function(){
	return function(data, val){
		if(angular.isString(data)){
			var newString = val ? data.toUpperCase() : data.toLowerCase();
			
			return newString
		}
	}
})
app.filter('filterSlice', function(){
	return function(data, count){
		if(angular.isArray(data) && angular.isNumber(count)){
			if(count > data.length && count < 1){
				return data;
			} else {
				return data.slice(count)
			}
		} else {
			return data;
		}
	}
})
app.filter('take', function($filter){
	return function(data, from, count){
		var arr = $filter('filterSlice')(data, from);
		return $filter('limitTo')(arr, count);
	}
})
app.directive('listUser', function(){
	return {
		restrict: 'EA',
		link: function(scope, elem, attr){
			var users = scope[attr['listUser']](),
				attrebut = attr['displayAttr'];
			if(angular.isArray(users)){
				var elemUl = angular.element('<ul>');
				elem.append(elemUl);
				for(var i = 0; i < users.length; i++){
					//elemUl.append(angular.element('<li>').text(users[i][attrebut]))
					elemUl.append(angular.element('<li>').text(scope.$eval(attrebut, users[i]))); //метод eval используется для выводимых данных применяется фильтр
				}
			}
		}
	}
})
app.directive('perspectSkill', function(){
	return {
		restrict: 'EA',
		link: function(scope, elem, attr){
			var data = scope[attr['perspectSkill']](),
				attribut = attr["displayAttr"];

			if(angular.isArray(data)){
				var elemUl = angular.element('<ul>');
				elem.append(elemUl);
				for(var i = 0; i < data.length; i++){
					(function(){
						var elemLi = angular.element('<li>'),
							index = i;
						elemUl.append(elemLi);
						var wothcherFunc = function(scopFunc){
							return scopFunc.$eval(attribut, data[index]);
						}
						scope.$watch(wothcherFunc, function(newVal, oldVal){
							elemLi.text(newVal);
						})
					}())
				}
			}
		}
	}
})


/*Сервис*/
var Users = function(){
	this.name = 'Ivan',
	this.msg = function(msg){
		console.log(this.skill + ' ' + this.name + ' : ' + msg)
	}
}
var dev = function(){};
dev.prototype = new Users();
dev.prototype.skill = 'Devoloper';

var pohodnik = function(){};
pohodnik.prototype = new Users();
pohodnik.prototype.skill = 'Pohodnik';

app.service('devService', dev)
	.service('pohodService', pohodnik);
// app.provider('testProvider', function(){
// 	var debag = true;
// 	return {
// 		itemEdit: function(siting){
// 			if(angular.isDefined(siting)){
// 				debag = siting;
// 				return this;
// 			} else {
// 				return counter;
// 			}
// 		},
// 		$get: function(){
// 			return {
// 				messCount: 0,
// 				log: function(msg){
// 					if(debag){
// 						//console.log(this.messCount++);
// 					}
// 				}
// 			}
// 		}
// 	}
// })
// app.config(function(testProvider){
// 	testProvider.itemEdit(false);
// })
app.controller('serviceCtrl', function($scope, devService, pohodService){
	$scope.totalClick = 0;
	$scope.$watch('totalClick', function(newVal){
		console.log('ctrl: ' + newVal)
	})
})
app.directive('servDir', function(devService, pohodService){
	return {
		scope: {
			total: '='
		},
		link: function(scope, elem, attr){
			elem.on('click', function(){
				devService.msg('dev eeeoou!!');
				scope.total++;
				scope.$apply();
			})
		}
	}
})
/*end*/

app.controller('testSanitize', function($scope, $sanitize, $sce){
	$scope.inText = '<p>Ldfsfd sdfsdf <b onmouseover=alert("aaaa")>dfdfd</b><p>';
	$scope.text = '<p>Ldfsfd sdfsdf <b onmouseover=alert("aaaa")>dfdfd</b><p>';
	$scope.$watch('inText', function(newVal){
		$scope.outText = $sanitize(newVal);
		//$scope.outText = $sce.trustAsHtml(newVal); //разрешить ввод любых текстов, включая скрипты
	})
})

/*Compile*/
app.controller('testCompile', function($scope){
	$scope.items = ['ivan', 'petr', 'sergey'];
})
app.directive('userDir', function($compile){
	return {
		link: function(scope, elem, attr){
			var html = '<ul><li ng-repeat="item in items">{{item}}</li></ul>',
				ul = angular.element(html),
				funcUl = $compile(ul);
			funcUl(scope);
			elem.append(ul);
		}
	}
})

/*AJAX*/
app.config(function($httpProvider){
	/*установка трансформации по умолчанию*/
	// $httpProvider.defaults.transformResponse.push(function(response, headers){
		/*можно добавить доп проверку на headers чтобы трансформировать именно xml или json*/
	// 	var elems = angular.element(response.trim()).find("item"),
	// 		reks = [];
	// 	for(var i = 0; i < elems.length; i++){
	// 		var el = elems.eq(i);
	// 		reks.push({
	// 			name: el.attr("name"),
	// 			categ: el.attr("categ")
	// 		})
	// 	}
	// 	return reks
	// })
	/*перехватчики*/
	// $httpProvider.interceptors.push(function(){
	// 	return {
	// 		request: function(config){
	// 			//выполнится перед отправкой запроса
	// 			config.url = "/data/reki.xml";
	// 			return config
	// 		},
	// 		response: function(response){
	// 			console.log(response.data.length);
	// 			return response;
	// 		}
	// 	}
	// })
})
app.controller('testAjax', function($scope, $http){

	$scope.showElems = function(){
		var promise = $http.get('/data/tests.json');
		promise.then(fullfilled, rejected);
		function fullfilled(data){
			$scope.items = data.data;
			console.log(data.data)
		}
		function rejected(error){
			console.log('Ошибка ' + err)
		}
	}
	/*вывод xml*/
	$scope.showReki = function(){
		// $http.get('/data/reki.xml').then(function(data){
		// 	var elems = angular.element(data.data.trim()).find("item"),
		// 		reks = [];
		// 	for(var i = 0; i < elems.length; i++){
		// 		var el = elems.eq(i);
		// 		reks.push({
		// 			name: el.attr("name"),
		// 			categ: el.attr("categ")
		// 		})
		// 	}
		// 	$scope.reks = reks;
		// })
		/*более локаничный способ*/
		var config = {
			transformResponse: function(response, headers){
				var elems = angular.element(response.trim()).find("item"),
					reks = [];
				for(var i = 0; i < elems.length; i++){
					var el = elems.eq(i);
					reks.push({
						name: el.attr("name"),
						categ: el.attr("categ")
					})
				}
				return reks
			}
		}
		$http.get('/data/reki.xml', config).success(function(response){
			$scope.reks = response;
		})
	}
	$scope.request = function(){
		/*отправка данных на сервак*/
		var conf = {
			headers: {
				"content-type": "application/xml"
			},
			transformRequest: function(data, headers){
				var rootEl = angular.element("<xml>"),
					items = angular.element("<items>");
				for(var i = 0; i < data.length; i++){
					var item = angular.element("<item>");
					item.attr("name", data[i].name);
					item.attr("categ", data[i].categ);
					items.append(item);
				}
				rootEl.append(items);
				return rootEl.html();
			}
		}
		$http.post('ttttt.html', $scope.reks, conf);
	}
})
app.constant("baseUrl", "http://localhost:2403/items/");
app.controller('testRest', function($scope, $http, baseUrl, $resource){

	$scope.itemResource = $resource(baseUrl + ':id', {id: '@id'});

	$scope.refrash = function(){
		// $http.get(baseUrl).success(function(data){
		// 	$scope.items = data;
		// })
		$scope.items = $scope.itemResource.query();
	}
	$scope.viewNew = false;
	$scope.addItem = function(newItem){
		// $http.post(baseUrl, newItem).success(function(){
		// 	$scope.items.push(newItem);
		// })
		new $scope.itemResource(newItem).$save().then(function(item){
			$scope.items.push(item);
		})
	}
	$scope.removeItem = function(item){
		// $http({
		// 	url: baseUrl + item.id,
		// 	method: "DELETE"
		// }).success(function(){
		// 	$scope.items.splice($scope.items.indexOf(item), 1);
		// })
		item.$delete().then(function(){
			$scope.items.splice($scope.items.indexOf(item), 1);
		})
	}
	$scope.itemCopy = null;
	$scope.statusEdit = false;
	$scope.clickEdit = function(item){
		$scope.itemCopy = angular.copy(item);
		$scope.statusEdit = true;
	}
	$scope.editItem = function(){
		// $http({
		// 	url: baseUrl + $scope.itemCopy.id,
		// 	method: "PUT",
		// 	data: $scope.itemCopy
		// }).success(function(modifireItem){
		// 	for(var i = 0; i < $scope.items.length; i++){
		// 		if($scope.items[i].id === modifireItem.id){
		// 			$scope.items[i] = modifireItem;
		// 			break;
		// 		}
		// 	}
		// })
		$scope.itemCopy.$save().then(function(modifireItem){
			for(var i = 0; i < $scope.items.length; i++){
				if($scope.items[i].id === modifireItem.id){
					$scope.items[i] = modifireItem;
					break;
				}
			}
		})
		$scope.itemCopy = null;
		$scope.statusEdit = false;
	}
	$scope.refrash();
})