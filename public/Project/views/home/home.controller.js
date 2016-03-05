"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("HomeController", HomeController);

    function HomeController ($scope, $location) {
        console.log($location.path());
        $scope.$location = $location;


    }
})();