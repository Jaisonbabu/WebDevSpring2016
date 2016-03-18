"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($scope, $location, UserService) {

        UserService.checkLoggedIn();

        console.log($location);
        $scope.$location = $location;

        $scope.logout = function logout() {
            $location.url("/");
            UserService.setUser(null);

        }
    }
})();