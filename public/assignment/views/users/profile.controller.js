"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, $location) {
        console.log($location.path());
        $scope.$location = $location;



    }
})();