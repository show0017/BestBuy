angular.module('BestBuy')

.controller('LogsCtrl', ['$scope', 'Logger','$interval',function($scope, Logger, $interval){
	
	$scope.messages = Logger.allMsgs();
	$scope.stackframes = ["Select log message to display call stack"];

	$scope.displayCallStack = function($index){
		console.log("inside displayCallStack");
		$scope.stackframes = $scope.messages[$index].callstack.split("\n");
	};

	$interval(function(){
		$scope.messages = Logger.allMsgs();
	}, 1000);

}]);