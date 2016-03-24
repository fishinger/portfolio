angular.module('app')
.factory('cardFactories', function(){
	var service = {},
		cards = [
			{
				id: '55',
				description: 'Lorem ipsum dolor.',
				name: 'Name1',
				list_id: 1
			},
			{
				id: '56',
				description: 'Lorem ipsum dolor.',
				name: 'Name2',
				list_id: 3
			},
			{
				id: '57',
				description: 'Lorem ipsum dolor.',
				name: 'Name3',
				list_id: 3
			},
			{
				id: '58',
				description: 'Lorem ipsum dolor.',
				name: 'Name4',
				list_id: 4
			},
			{
				id: '59',
				description: 'Lorem ipsum dolor.',
				name: 'Name5',
				list_id: 1
			}
		]
	service.getCards = function(list){
		return _.filter(cards, {list_id: list.id})
	}
	service.addCard = function(list, name){
		cards.push({
			id: _.uniqueId('card_'),
			description: 'Lorem ipsum dolor.',
			name: name,
			list_id: list.id
		})
	}
	service.removeCard = function(card){
		_.pull(cards, card)
	}
	service.updateCard = function(card){
		var updateCard = _.findWhere(cards, {id: card.id});
		updateCard.description = card.description;
		updateCard.list_id = card.list_id;
	}
	return service;
})