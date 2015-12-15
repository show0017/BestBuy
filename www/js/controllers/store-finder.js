angular.module('BestBuy')

.controller('StoreFinderCtrl', ['$scope','$cordovaGeolocation','StoreFinderAPI',function($scope, $cordovaGeolocation, StoreFinderAPI) {

	/* Get user's current location. */
	var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
    	console.log("User's currrent location is obtained successfully");
      StoreFinderAPI.setCurrentLocation(position.coords.latitude, position.coords.longitude);
    }, function(err) {
      /* TODO: Log error */
   	});

  var successCallback = function(response){
    console.log(response);

    /* Append the new stores to the original array stores. */
    $scope.search.stores = $scope.search.stores.concat(response.data.stores);
    
    /* Update list of stores at StoreFinder Service. */
    StoreFinderAPI.setStores($scope.search.stores);

    /* Update results object.*/
    results.numOfPages = response.data.totalPages;
    results.numOfStores = response.data.total;
    results.currentPage = response.data.currentPage;

    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  var errorCallback = function(response){
    console.log("inside BestBuyAPI Search errorCallback");
    console.log(response);
  };

  /* Get closest stores to the current location */
  StoreFinderAPI.getClosestByZipcode(successCallback, errorCallback);
   
  $scope.search = 
  {
    query    : '',
    stores   : []
  };

  var results = {
      numOfStores : 0,
      numOfPages    : 0,
      currentPage   : 0,
      numOfItemsPerPage: 10
  };  

  $scope.searchUserInput = function(){
  	console.log("inside searchUserInput");
  	console.log($scope.search.query);

    if($scope.search.query == ""){
      /* TODO: Display error feedback to the user that the input is empty.*/
    }else{
    	 /* Reset stores (if any)*/
    	 $scope.search.stores = [];
       StoreFinderAPI.searchByCity($scope.search.query, successCallback, errorCallback);
    }
  };
  
  $scope.moreStoresCanBeLoaded = function(){
  	return results.currentPage < results.numOfPages;
  };

  $scope.loadMoreStores = function(){
  	console.log("Load More Data");
  	StoreFinderAPI.getItemsAtPage(results.currentPage+1, successCallback, errorCallback);
  };
}]);