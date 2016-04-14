"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($scope, $location, UserService) {

        var vm = this;

        vm.logout = logout;

        function init() {
            vm.$location = $location;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setUser(null);
                    $location.url("/");
                });
        }
        //UserService.checkLoggedIn();
        //
        ////console.log($location);
        ////$scope.$location = $location;
        //
        //$scope.logout = function logout() {
        //    UserService
        //        .logout()
        //        .then(function(){
        //            UserService.setUser(null);
        //            $location.url("/");
        //        });
        //}


    }
})();