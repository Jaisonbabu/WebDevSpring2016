"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($scope, $location, UserService) {

        console.log($location);
        $scope.$location = $location;

        $scope.logout = function logout() {
            UserService.setUser(null);
            $location.url("/");

        }
    }
})();