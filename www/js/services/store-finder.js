angular.module('BestBuy')

.factory('StoreFinderAPI', ['$http','$filter',function($http, $filter) {

  var API_KEY = "e47jhn2cbpaehzqf7n8jdazc";

  var SEARCH_GEO_PREFIX  = "http://api.bestbuy.com/v1/stores(area(";
  var SEARCH_CITY_PREFIX = "http://api.bestbuy.com/v1/stores(city=";

  var SEARCH_PREFIX;
  var SEARCH_POSTFIX;

  var SEARCH_GEO_POSTFIX = "))?format=json&show=storeId,name,detailedHours,phone,address&apiKey="+ API_KEY;
  var SEARCH_CITY_POSTFIX= ")?format=json&show=storeId,name,detailedHours,phone,address&apiKey="+ API_KEY; 

  var PAGE_QUERY     = "&page=";

  var allStores      = [];
  
  var currentCity    = "";

  var location = {
    lat: -1,
    lng: -1,
    minimumDistance: 10,
    zipcode : 55423 
  };

  return {
    setCurrentLocation: function(latitude,longitude){
      location.lat = latitude;
      location.lng = longitude;
    },

    getItemsAtPage: function(pageNum, successCallback, errorCallback) {
      $http.get(SEARCH_PREFIX+currentCity+SEARCH_POSTFIX+PAGE_QUERY+pageNum).then(successCallback, errorCallback);  
    },

    searchByCity: function(query, successCallback, errorCallback){
      currentCity = query;
      
      SEARCH_PREFIX  = SEARCH_CITY_PREFIX;
      SEARCH_POSTFIX = SEARCH_CITY_POSTFIX;
      
      $http.get(SEARCH_PREFIX+currentCity+SEARCH_POSTFIX).then(successCallback, errorCallback);      
    },

    getClosestByGeoLocation: function(successCallback, errorCallback, minimumDistance){
      location.minimumDistance = minimumDistance? minimumDistance: 10;

      SEARCH_PREFIX  = SEARCH_GEO_PREFIX;
      SEARCH_POSTFIX = SEARCH_GEO_POSTFIX;      

      $http.get(SEARCH_PREFIX +
                  location.lat + "," +
                  location.lng + "," +
                  location.minimumDistance +
                  SEARCH_POSTFIX).then(successCallback, errorCallback);      
    },

    getClosestByZipcode: function(successCallback, errorCallback, zipcode){

      location.zipcode = zipcode? zipcode: 55423;

      SEARCH_PREFIX  = SEARCH_GEO_PREFIX;
      SEARCH_POSTFIX = SEARCH_GEO_POSTFIX;      

      $http.get(SEARCH_PREFIX +
                  location.zipcode + "," +
                  location.minimumDistance +
                  SEARCH_POSTFIX).then(successCallback, errorCallback);      
    },

    setStores: function(stores){
      allStores = stores;
    },

    getStoreById: function(id){
      var result = $filter('filter')(allStores, { storeId: id });
      return result? result[0]: {};
    }    
  };
}]);
