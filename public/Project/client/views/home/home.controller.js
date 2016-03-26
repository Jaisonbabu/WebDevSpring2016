"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("HomeController", HomeController);

    function HomeController ($scope, $location, SearchService) {
        console.log($location.path());
        $scope.$location = $location;

        var searchResponsehandler = function (response){
            //response.header('Access-Control-Allow-Origin', '*');
            //response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            //response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            $scope.response = response;

            console.log("INside Response handler");
            console.log(response);

        };

        SearchService.fetchResult()
        .then(function (response){
            console.log(response.data.restaurants);
            $scope.restaurants = response.data.restaurants;
            console.log($scope.restaurants[1].restau)
        },
        function(err){

        });




    }
})();