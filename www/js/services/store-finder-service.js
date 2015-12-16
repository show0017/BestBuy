angular.module('BestBuy')

.factory('StoreFinderAPI', ['$http','$filter','$ionicLoading',function($http, $filter, $ionicLoading) {

  var API_KEY = "e47jhn2cbpaehzqf7n8jdazc";

  var SEARCH_PREFIX  = "http://api.bestbuy.com/v1/stores(";

  var SEARCH_POSTFIX =     ")?format=json&show=storeId,name,detailedHours,phone,address&apiKey="+ API_KEY;
  // var SEARCH_CITY_POSTFIX= ")?format=json&show=storeId,name,detailedHours,phone,address&apiKey="+ API_KEY; 

  var CURRENT_SEARCH_QUERY;

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
      $http.get(CURRENT_SEARCH_QUERY+PAGE_QUERY+pageNum).then(successCallback, errorCallback);
      $ionicLoading.show({
        template: '<ion-spinner icon="ios" class="spinner-positive"></ion-spinner>'
      });        
    },

    searchByCity: function(query, successCallback, errorCallback){
      currentCity = query;
      

      CURRENT_SEARCH_QUERY = SEARCH_PREFIX +
                                "city="+
                                currentCity+
                                SEARCH_POSTFIX;

      $http.get(CURRENT_SEARCH_QUERY).then(successCallback, errorCallback);      
      $ionicLoading.show({
        template: '<ion-spinner icon="ios" class="spinner-positive"></ion-spinner>'
      });      
    },

    getClosestByGeoLocation: function(successCallback, errorCallback, minimumDistance){
      location.minimumDistance = minimumDistance? minimumDistance: 10;      

      CURRENT_SEARCH_QUERY = SEARCH_PREFIX +
                                "area("+
                                location.lat + "," +
                                location.lng + "," +
                                location.minimumDistance +
                                ")"+
                                SEARCH_POSTFIX;

      $http.get(CURRENT_SEARCH_QUERY).then(successCallback, errorCallback);           
    },

    getClosestByZipcode: function(successCallback, errorCallback, zipcode){

      location.zipcode = zipcode? zipcode: 55423;

      CURRENT_SEARCH_QUERY = SEARCH_PREFIX +
                                "area("+
                                location.zipcode + "," +
                                location.minimumDistance +
                                ")"+
                                SEARCH_POSTFIX;

      $http.get(CURRENT_SEARCH_QUERY).then(successCallback, errorCallback);
      $ionicLoading.show({
        template: '<ion-spinner icon="ios" class="spinner-positive"></ion-spinner>'
      });            
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
