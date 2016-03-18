"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, $location, $rootScope, UserService) {

        console.log($rootScope.currentUser + " inside login controller");

        $scope.error = null;
        $scope.login = function (user){

            var userLogin = function (user){
                if (user != null){
                    UserService.setUser(user);
                    $location.url('/profile');
                    console.log($rootScope.currentUser);
                }
                else {
                    $scope.error = "Invalid Username or Password";
                }
            };

           UserService.findUserByCredentials(user.username,user.password, userLogin);

        }
    }
})();