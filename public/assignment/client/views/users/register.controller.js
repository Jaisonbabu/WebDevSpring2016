"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService ) {


        $scope.message = null;
        $scope.register = register;

        function register(user){

            var userName = user.username;

            UserService.findUserByUsername(userName)
                .then(function (userPresent){
                        if(Object.keys(userPresent.data).length == 0)
                        // userPresent.data == null)
                        {
                            UserService.createUser(user)
                                .then(function (users){
                                        UserService.findUserByUsername(userName)
                                            .then(function (userPresent){
                                                    UserService.setUser(userPresent.data);
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
        }


    }
})();