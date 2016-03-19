"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService ) {


        $scope.message = null;

        $scope.register = function(user){

            console.log("Inside register controller");

            var userName = user.username;
            UserService.findUserByUsername(userName)
                .then(function (user){
                        if(user.data == null) {
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
                        }else{
                            $scope.message = "Username Already Exists";
                        }
                    },
                    function(err){

                    });
        };


    }
})();