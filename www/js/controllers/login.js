angular.module('BestBuy')

.controller('LoginCtrl', ['$scope', '$cordovaOauth','$http','$ionicPopup','$state','$log','$rootScope',
  function($scope, $cordovaOauth, $http, $ionicPopup, $state, $log, $rootScope){
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
      console.log("broadcast event");
      $scope.$emit("event-login-success",$scope.user.name);
    };

    $scope.verifyUsername = function(){

      /* If the username is empty or is set to Guest, consider both as error cases.*/
      if( ($scope.user.name == "") || $scope.user.name.toLowerCase() == "guest"){
        
        $scope.error.isActive = true;
        $scope.error.usernameMsg = "Invalid username";
        $scope.usernameFeedbackType = "feedback-error";
        $scope.isInvalidForm = true;
        $log.error("Invalid username:" + $scope.user.name);
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
        $log.error("Invalid password:" + $scope.user.password);
      }else{
        $scope.error.isActive = false;
        $scope.error.passwordMsg = "";
        $scope.passwordFeedbackType = "feedback-success";

        /* The Login button should be disabled if the username input is empty OR
         * if the username error message is not empty*/
        $scope.isInvalidForm = ($scope.user.name == "") || ($scope.error.usernameMsg != "");
      }
      
             
    };

    $scope.facebookLogin = function() {
      console.log("inside facebookLogin");
      $cordovaOauth.facebook("182455115434881", ["email"])
      .then(function(result) {
        console.log(JSON.stringify(result));

        $http.get("https://graph.facebook.com/v2.5/me", 
        { params: { access_token: result.access_token, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
        $ionicPopup.alert({
        title: 'Success',
        content: 'You have successfully logged in!' + JSON.stringify(result.data)
        }).then(function(){
          $state.go('tab.dash');
        })
        }, function(error) {
          alert("There was a problem getting your profile. Check the logs for details.");
          console.log(error);
          
        });
      })
      .catch(function(response) {
        $ionicPopup.alert({
        title: 'Error',
        content: response.data ? response.data || response.data.message : response
        })
      });  
    };
}]);
