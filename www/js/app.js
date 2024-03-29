angular.module('BestBuy', ['ionic','ngCordova'])

.run(['$ionicPlatform','$rootScope', '$state', function($ionicPlatform, $rootScope, $state) {

   $rootScope.$on('event-login-success', function(event,username) {
    $rootScope.isAuthenticated = true;
    $rootScope.username = username;
    $state.go("tab.search");
  });

  $rootScope.$on('$stateChangeStart', function (event, target) {

    if((target.name != "login") && (!$rootScope.isAuthenticated)){
      event.preventDefault();
      $state.go("login");
    }
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])

.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {



  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller:'LoginCtrl'
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('tab.store-finder', {
    url: '/store-finder',
    views: {
      'tab-store-finder': {
        templateUrl: 'templates/tab-store-finder.html',
        controller: 'StoreFinderCtrl'
      }
    }
  })

  .state('tab.store-details', {
    url: '/store/:storeId',
    views: {
      'tab-store-finder': {
        templateUrl: 'templates/store-details.html',
        controller: 'StoreDetailsCtrl'
      }
    }
  })

  .state('tab.logs', {
    url: '/logs',
    views: {
      'tab-logs': {
        templateUrl: 'templates/tab-logs.html',
        controller: 'LogsCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}]);
