"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService ) {

        var vm = this;

        vm.message = null;

        vm.register = register;

        function init() {

        }
        init();


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
                                        vm.message = "Cannot register";
                                    });
                        }else{
                            vm.message = "Username Already Exists";
                        }
                    },
                    function(err){
                        vm.message = "Username Already Exists";
                    }
                );
        }
    }
})();