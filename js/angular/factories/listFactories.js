angular.module('app')
.factory('listFactory', function(){
	var service = {},
		lists = [
			{
				id: 1,
				name: 'angular'
			},
			{
				id: 2,
				name: 'pohod'
			},
			{
				id: 3,
				name: 'slider'
			},
			{
				id: 4,
				name: 'job'
			}
		]
	service.getLists = function(){
		return lists;
	}
	service.addList = function(name){
		lists.push({
			id: _.uniqueId(),
			name: name
		})
	}
	service.removeList = function(list){
		_.pull(lists, list)
	}
	return service;
})