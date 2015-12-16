angular.module('BestBuy')

.controller('AccountCtrl',['$scope', '$rootScope', '$state', function($scope, $rootScope, $state){
  
  	$scope.username = $rootScope.username;


  	$scope.onClickLogout = function(){

  		$state.go("login");
  	};
}]);
