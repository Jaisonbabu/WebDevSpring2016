"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController ($scope, $location) {
        var vm = this;
        console.log($location.path());
        $scope.$location = $location;
    }
})();