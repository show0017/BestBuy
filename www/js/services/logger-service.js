angular.module('BestBuy')

.factory('Logger', [function(){

	var KEY = "show0017-errors";

	return{
    /* There was circular dependency, if I inject $rootScope in the service or the decorator.
     * As a workaround, I am gonna use ng-local-storage to watch for changes. */
		appendNewMsg: function (newLogMsg) {
			var logs = JSON.parse(window.localStorage.getItem(KEY)) || [];
			logs.push(newLogMsg);
			
			window.localStorage.setItem(KEY, JSON.stringify(logs));
		},

		allMsgs: function(){
			return JSON.parse(window.localStorage.getItem(KEY)|| []);
		}
	};
}])

.decorator( '$log', [ '$delegate','Logger',function($delegate, Logger){
    // Save the original $log.error()
    var errorFn = $delegate.error;

    $delegate.error = function( ){
      
      // /* Get the arguments of $log.error. Also Get the current date. */
      var args    = [].slice.call(arguments);
      
      var originalMsg = args[0];
      
      var time = new Date().toString();

      // Prepend timestamp
      args[0] = [time , ': ', args[0]].join('');

      var callback = function(stackframes) {
        var stringifiedStack = stackframes.map(function(sf) {
          return sf.toString();
        }).join('\n');

        args[0] = [ args[0], stringifiedStack ].join('\n**************************************\n');

	      Logger.appendNewMsg({
	      	'time'		  : time,
	      	'msg' 		  : originalMsg,
	      	'callstack' : stringifiedStack
	      });

      };

       //var errback = function() { };

       window.StackTrace.get().then(callback);
      
      // Logger.appendNewMsg({
      // 	'time'		  : time,
      // 	'msg' 		  : originalMsg
      // });

      // Call the original with the output prepended with formatted timestamp
      errorFn.apply(null, args);
    };

    return $delegate;
}]);
