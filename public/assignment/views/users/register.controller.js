"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService ) {


        $scope.error = null;

        $scope.register = function(user){

            console.log("Inside register controller");
            if(user == null){
                $scope.error = " Please fill the missing required fields"
            }

            var userExists = UserService.userExists(user.username);

            if(userExists){
                $scope.error = "Username Already Exists";
                return;
            }

            UserService.createUser(user, function (user){
                UserService.setUser(user)
            });

            $location.url("/profile");




        };


    }
})();