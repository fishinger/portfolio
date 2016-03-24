angular.module('app')
.controller('listsCtrl', function(listFactory){
	this.getLists = listFactory.getLists();
	this.addList = function(){
		listFactory.addList(this.name);
		this.name = '';
	}
})