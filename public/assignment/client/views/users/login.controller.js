"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, $location, $rootScope, UserService) {

        console.log($rootScope.currentUser + " inside login controller");

        $scope.error = null;
        $scope.login = login;

        var login = function (user){

            UserService.findUserByCredentials(user.username,user.password)
            .then(
                function (user){
                    if (user.data != null){
                        UserService.setUser(user.data);
                        $location.url('/profile');
                        console.log($rootScope.currentUser);
                    }
                    else {
                        $scope.error = "Invalid Username or Password";
                    }
                },
                function (err){
                    $scope.error = "Login Failed, Please try again";
                }
            );


        }
    }
})();