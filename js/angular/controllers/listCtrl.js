angular.module('app')
.controller('listCtrl', function(listFactory, cardFactories){
	this.removeList = function(list){
		listFactory.removeList(list)
	}
	this.getCards = function(list){
		return cardFactories.getCards(list);
	}
	this.addCard = function(list){
		cardFactories.addCard(list, this.cardName);
		this.cardName = '';
	}
})