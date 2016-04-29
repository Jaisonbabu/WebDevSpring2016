"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($rootScope, $location, UserService) {

        var vm = this;

        vm.logout = logout;



        function init() {
            vm.$location = $location;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function(user){
                    console.log("logout success");
                    UserService.setUser(null);
                    console.log($rootScope.currentUser);
                    $location.url("/");
                },
                function(err){
                    console.log("logout error");
                });
        }


    }
})();