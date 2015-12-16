angular.module('BestBuy')

.factory('SearchAPI', ['$http','$ionicLoading',function($http,$ionicLoading) {
  var API_KEY = "e47jhn2cbpaehzqf7n8jdazc";

  var SEARCH_PREFIX  = "http://api.bestbuy.com/v1/products((search=";
  var SEARCH_POSTFIX = "))?show=name,sku,salePrice,image&format=json&apiKey="+ API_KEY; 
  var PAGE_QUERY     = "&page=";
  var currentQuery   = "";

  return {
    
    getItemsAtPage: function(pageNum, successCallback, errorCallback) {
      $http.get(SEARCH_PREFIX+currentQuery+SEARCH_POSTFIX+PAGE_QUERY+pageNum).then(successCallback, errorCallback);
      /* No need to display spinner, just get the data silently at the background. */
    },

    search: function(query, successCallback, errorCallback){
      currentQuery = query;
      $ionicLoading.show({
        template: '<ion-spinner icon="ios" class="spinner-positive"></ion-spinner>'
      });
      $http.get(SEARCH_PREFIX+currentQuery+SEARCH_POSTFIX).then(successCallback, errorCallback);      
    }

  };
}]);
