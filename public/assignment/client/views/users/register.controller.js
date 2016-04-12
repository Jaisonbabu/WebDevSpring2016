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
                        if(userPresent.data == null){
                            UserService.createUser(user)
                                .then(function (user) {
                                        UserService.setUser(user.data);
                                        $location.url("/profile");
                                    },
                                    function (err){
                                        $scope.message = "Cannot register";
                                    });
                        }else{
                            $scope.message = "Username Already Exists";
                        }
                    },
                    function(err){
                        $scope.message = "Username Already Exists";
                    });
        }
    }
})();