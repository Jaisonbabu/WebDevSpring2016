"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController ($scope, $location) {
        console.log($location.path());
        $scope.location = $location;

    }
})();