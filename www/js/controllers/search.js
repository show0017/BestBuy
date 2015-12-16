angular.module('BestBuy')

.controller('SearchCtrl', ['$scope','SearchAPI','$ionicSlideBoxDelegate','$ionicPopup','$ionicLoading','$log',function($scope, SearchAPI, $ionicSlideBoxDelegate, $ionicPopup, $ionicLoading, $log) {

  $scope.search = 
  {
    query    : '',
    products : []
  };

  var results = {
      numOfProducts : 0,
      numOfPages    : 0,
      currentPage   : 0,
      numOfItemsPerPage: 10
  };

  var successCallback = function(response){
    $ionicLoading.hide();

    /* Append the new products to the original array products. */
    $scope.search.products = $scope.search.products.concat(response.data.products);
    
    /* Update ionic Slide Box by the new products.*/
    $ionicSlideBoxDelegate.update();

    /* Update results object.*/
    results.numOfPages = response.data.totalPages;
    results.numOfProducts = response.data.total;
    results.currentPage = response.data.currentPage;
    
    if(response.data.products.length === 0 ){
      $scope.search.products = [];
        $ionicPopup.alert({
           title: 'No Item Found',
           template: 'Try different keyword to search for'
         });
      }
  };

  var errorCallback = function(response){
      $log.error("Error while communicating with SearchAPI "+ response);
      $ionicLoading.hide();
      $scope.search.products = [];
        $ionicPopup.alert({
           title: 'Error',
           template: 'Could not execute your search query. Try again later.'
         });
  };


  $scope.searchUserInput = function(){

    if(!$scope.search.query){
      /* TODO: Display error feedback to the user that the input is empty.*/
    }else{
      SearchAPI.search($scope.search.query, successCallback, errorCallback);
    }
  };

  $scope.slideHasChanged = function($index){
   
    /* When the user slides to 5th product in each page, get the products of the next page. */
    if( (results.currentPage < results.numOfPages) &&
        ($index == ((results.currentPage * results.numOfItemsPerPage) - 6)) )
    {
      SearchAPI.getItemsAtPage(results.currentPage+1, successCallback, errorCallback);
    }

    /* Slide to the indicated index. */
    $ionicSlideBoxDelegate.slide($index);
  };

}]);