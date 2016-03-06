"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("HomeController", HomeController);

    function HomeController ($scope, $location, SearchService) {
        console.log($location.path());
        $scope.$location = $location;

        var searchResponsehandler = function (response){
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "X-Requested-With");
            $scope.response = response;
            console.log(response);

        };

        SearchService.fetchResult(searchResponsehandler);




    }
})();