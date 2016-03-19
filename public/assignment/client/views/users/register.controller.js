"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService ) {


        $scope.message = null;

        $scope.register = function(user){

            console.log("Inside register controller");

            var userExists = UserService.userExists(user.username);

            if(userExists){
                $scope.message = "Username Already Exists";
                return;
            }

            UserService.createUser(user)
            .then(function (users){
                UserService.findUserByUsername(user.username)
                .then(function (user){
                        UserService.setUser(user.data);
                        $location.url("/profile");
                },
                function (err){
                    $scope.message = "Cannot register";
                });
            },
            function (err){
                $scope.message = "Cannot register";
            });


        };


    }
})();