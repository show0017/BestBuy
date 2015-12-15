angular.module('BestBuy')

.controller('SearchCtrl', ['$scope','SearchAPI','$ionicSlideBoxDelegate',function($scope, SearchAPI, $ionicSlideBoxDelegate) {

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
    console.log(response);

    /* Append the new products to the original array products. */
    $scope.search.products = $scope.search.products.concat(response.data.products);
    
    /* Update ionic Slide Box by the new products.*/
    $ionicSlideBoxDelegate.update();

    /* Update results object.*/
    results.numOfPages = response.data.totalPages;
    results.numOfProducts = response.data.total;
    results.currentPage = response.data.currentPage;
  };

  var errorCallback = function(response){
    console.log("inside BestBuyAPI Search errorCallback");
    console.log(response);
  };

  $scope.searchUserInput = function(){

    if($scope.search.query == ""){
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
  }

}]);