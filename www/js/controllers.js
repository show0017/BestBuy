angular.module('starter.controllers', [])

.controller('LoginCtrl', ['$scope', function($scope){
    $scope.user = 
    {
      'name':"",
      'password':""
    };

    $scope.error = 
    {
        isActive   : false,
        usernameMsg: "",
        passwordMsg: ""
    };

    $scope.isInvalidForm = true;
    $scope.onLogin = function(){
      
    };

    $scope.verifyUsername = function(){

      /* If the username is empty or is set to Guest, consider both as error cases.*/
      if( ($scope.user.name == "") || $scope.user.name.toLowerCase() == "guest"){
        
        $scope.error.isActive = true;
        $scope.error.usernameMsg = "Invalid username";
        $scope.usernameFeedbackType = "feedback-error";
        $scope.isInvalidForm = true;
      }else{
        
        $scope.error.isActive = false;
        $scope.error.usernameMsg = ""; 
        $scope.usernameFeedbackType = "feedback-success"; 

        /* The Login button should be disabled if the password input is empty OR
         * if the password error message is not empty*/
        $scope.isInvalidForm = ($scope.user.password == "") || ($scope.error.passwordMsg != "") ;     
      }     
    };

    $scope.verifyPassword = function(){

      /* If password lenght is less than 5, consider this as error case. */
      if(5 > $scope.user.password.length){
        $scope.error.isActive = true;
        $scope.error.passwordMsg = "password lenght must be @ least 5 characters";
        $scope.passwordFeedbackType = "feedback-error";
        $scope.isInvalidForm = true;
      }else{
        $scope.error.isActive = false;
        $scope.error.passwordMsg = "";
        $scope.passwordFeedbackType = "feedback-success";

        /* The Login button should be disabled if the username input is empty OR
         * if the username error message is not empty*/
        $scope.isInvalidForm = ($scope.user.name == "") || ($scope.error.usernameMsg != "");
      }
      
             
    };
}])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
