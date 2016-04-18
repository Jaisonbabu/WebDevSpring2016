"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("HomeController", HomeController);

    function HomeController ($scope, $location, SearchService,$rootScope) {

        var vm = this;

        function init() {

            // To retrieve User Location

            if(!navigator.geolocation){
                alert('Geolocation not supported by browser');
            }

        }
        init();

        function userLocation() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        SearchService.fetchResult(pos)
                            .then(function (response){
                                    console.log(response.data.restaurants);
                                    vm.restaurants = response.data.restaurants;
                                },
                                function(err){
                                    vm.message= "No results for this place";
                                });

                    }, function(){
                        $rootScope.apiResponse = 1;
                        $rootScope.$apply();
                    },{maximumAge:0,enableHighAccuracy:true}
                );
            }else{
                $rootScope.apiResponse = 1;
                $rootScope.$apply();
            }
        }

        userLocation();

        vm.userSearch = userSearch;
        console.log($location.path());
        $scope.$location = $location;

        //$scope.userSearch = userSearch;




        function userSearch(search){
            if(typeof search == "undefined") {
                console.log("Do Nothing");
            }else
            if(typeof search.place == "undefined"){
                console.log("place empty");
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            var newSearch = {
                                query : search.query,
                                place : pos
                            };

                            SearchService.userSearch(newSearch)
                                .then(function (response){
                                        vm.restaurants = response.data.restaurants;
                                    },
                                    function (err){

                                    })

                        }, function(){
                            $rootScope.apiResponse = 1;
                            $rootScope.$apply();
                        },{maximumAge:0,enableHighAccuracy:true}
                    );
                }else{
                    $rootScope.apiResponse = 1;
                    $rootScope.$apply();
                }
            }else{
                //get location for address
                SearchService.getLocationForAddress(search.place)
                    .then(function (pos){
                        console.log(pos.data);
                        if (pos.data.results.length > 0){

                            var newSearch = {
                                query : search.query,
                                lat : pos.data.results[0].geometry.location.lat,
                                lng : pos.data.results[0].geometry.location.lng
                            };
                            SearchService.userSearch(newSearch)
                                .then(function (response){
                                        vm.restaurants = response.data.restaurants;
                                    },
                                    function (err){

                                    })

                        }else{
                            alert("Location not found");
                        }


                    },function (err){

                    })


            }


        }

    }
})();