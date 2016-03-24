angular.module('app')
.controller('cardCtrl', function(cardFactories){
	this.removeCard = function(card){
		console.log('aaaaaa')
		cardFactories.removeCard(card)
	}
	this.statusEdit = false;
	this.copyCard = null;
	this.editCard = function(card){
		this.statusEdit = true;
		this.copyCard = angular.copy(card);
	}
	this.updateCard = function(){
		cardFactories.updateCard(this.copyCard);
		this.statusEdit = false;
		this.copyCard = null;
	}
})