angular.module('app').directive('closeEdit', function(){
	var keyCode = {
		ESC: 27
	}
	return {
		scope: {
			statusEdit: '='
		},
		link: function(scope, elem, attrs){
			elem.on('keyup', function(e){
				if(_.isEqual(e.keyCode, keyCode.ESC)){
					scope.statusEdit = false;
					scope.$apply();
				}
			})
		}
	}
})