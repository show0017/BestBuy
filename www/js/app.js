angular.module('BestBuy', ['ionic','ngCordova'])

.run(['$ionicPlatform',function($ionicPlatform) {
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

.config(['$stateProvider','$urlRouterProvider','$provide',function($stateProvider, $urlRouterProvider, $provide) {

$provide.decorator( '$log', [ "$delegate", function( $delegate )
{
    // Save the original $log.error()
    var errorFn = $delegate.error;

    $delegate.error = function( )
    {
      // /* Get the arguments of $log.error. Also Get the current date. */
      var args    = [].slice.call(arguments);

      // Prepend timestamp
      args[0] = [new Date().toString(), ': ', args[0]].join('');

      var callback = function(stackframes) {
        var stringifiedStack = stackframes.map(function(sf) {
          return sf.toString();
        }).join('\n');
        //console.log(stringifiedStack);
        args[0] = [ args[0], stringifiedStack ].join('\n**************************************\n');
        console.log(args[0]);
      };

      var errback = function(err) { };

      StackTrace.get().then(callback).catch(errback);
      
      // Call the original with the output prepended with formatted timestamp
      errorFn.apply(null, args)
    };

    return $delegate;
}]);

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
