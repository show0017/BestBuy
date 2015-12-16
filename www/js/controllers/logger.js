angular.module('BestBuy')

.controller('LogsCtrl', ['$scope', 'Logger',function($scope, Logger){
	
	$scope.messages = Logger.allMsgs();
	$scope.stackframes = ["Select log message to display call stack"];

	$scope.displayCallStack = function($index){
		console.log("inside displayCallStack");
		$scope.stackframes = $scope.messages[$index].callstack.split("\n");
	};

}]);