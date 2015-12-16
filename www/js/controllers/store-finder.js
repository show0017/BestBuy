angular.module('BestBuy')

.controller('StoreFinderCtrl', ['$scope','$cordovaGeolocation','StoreFinderAPI','$ionicPopup','$ionicLoading','$log',function($scope, $cordovaGeolocation, StoreFinderAPI, $ionicPopup, $ionicLoading, $log) {

  $ionicLoading.show({
    template: '<ion-spinner icon="ios" class="spinner-positive"></ion-spinner>'
  });

	/* Get user's current location. */
	var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
    	console.log("User's currrent location is obtained successfully");
      StoreFinderAPI.setCurrentLocation(position.coords.latitude, position.coords.longitude);
      /* Use maximum value of radius to get US stores with respect to Ottawa location. */
      StoreFinderAPI.getClosestByGeoLocation(successCallback, errorCallback, 2147483647);
    }, function(err) {
        $log.error("Failed to get user's current location."+ err);
        $ionicLoading.hide();
        $ionicPopup.alert({
           title: 'Error',
           template: 'Unable to detect your current location. Open your GPS'
         });
   	});

  var successCallback = function(response){
    $ionicLoading.hide();

    /* Append the new stores to the original array stores. */
    $scope.search.stores = $scope.search.stores.concat(response.data.stores);
    
    /* Update list of stores at StoreFinder Service. */
    StoreFinderAPI.setStores($scope.search.stores);

    /* Update results object.*/
    results.numOfPages = response.data.totalPages;
    results.numOfStores = response.data.total;
    results.currentPage = response.data.currentPage;

    if(response.data.stores.length === 0){

      $scope.search.stores = [];
        $ionicPopup.alert({
           title: 'Error',
           template: 'No Stores found in this City. Make sure it is in US.'
         });
    }
    
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

  var errorCallback = function(response){
      $log.error("Failed to communicate with StoreFinderAPI"+ response);
      $ionicLoading.hide();
      $scope.search.stores = [];
      $ionicPopup.alert({
           title: 'Error',
           template: 'Could not execute get stores request.'
         });
      
  };

  /* Get closest stores to the specific zipcode location */
  //StoreFinderAPI.getClosestByZipcode(successCallback, errorCallback);
  

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

    if(!$scope.search.query){
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