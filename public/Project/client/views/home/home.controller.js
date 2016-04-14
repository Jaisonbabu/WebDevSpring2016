"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("HomeController", HomeController);

    function HomeController ($scope, $location, SearchService) {
        console.log($location.path());
        $scope.$location = $location;

        $scope.userSearch = userSearch;


        //SearchService.fetchResult()
        //.then(function (response){
        //    console.log(response.data.restaurants);
        //    $scope.restaurants = response.data.restaurants;
        //},
        //function(err){
        //
        //});

        function userSearch(){
            SearchService.userSearch()
            .then(function (response){
                    $scope.restaurants = response.data.restaurants;
            },
            function (err){

            })
        }

    }
})();