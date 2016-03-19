"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController ($scope, $location) {
        console.log($location.path());
        $scope.$location = $location;
    }
})();