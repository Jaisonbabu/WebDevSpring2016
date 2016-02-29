"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($scope, $location) {
        console.log($location);
        $scope.$location = $location;
    }
})();