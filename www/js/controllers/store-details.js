angular.module('BestBuy')

.controller('StoreDetailsCtrl', ['$scope','$stateParams', 'StoreFinderAPI', function($scope, $stateParams, StoreFinderAPI) {

	$scope.store = StoreFinderAPI.getStoreById($stateParams.storeId);	
}]);