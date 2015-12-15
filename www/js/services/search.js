angular.module('BestBuy')

.factory('SearchAPI', ['$http',function($http) {
  var API_KEY = "e47jhn2cbpaehzqf7n8jdazc";

  var SEARCH_PREFIX  = "http://api.bestbuy.com/v1/products((search=";
  var SEARCH_POSTFIX = "))?show=name,sku,salePrice,image&format=json&apiKey="+ API_KEY; 
  var PAGE_QUERY     = "&page=";
  var products       = [];
  var currentQuery   = "";

  return {
    
    getItemsAtPage: function(pageNum, successCallback, errorCallback) {
      $http.get(SEARCH_PREFIX+currentQuery+SEARCH_POSTFIX+PAGE_QUERY+pageNum).then(successCallback, errorCallback);  
    },

    search: function(query, successCallback, errorCallback){
      currentQuery = query;
      $http.get(SEARCH_PREFIX+currentQuery+SEARCH_POSTFIX).then(successCallback, errorCallback);      
    }

  };
}]);
