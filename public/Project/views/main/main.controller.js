"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("MainController", MainController);

    function MainController($scope, $location ) {
        $scope.$location = $location;

    }
})();