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
                alert('El Navegador no soporta GeoLocalización');
            }
            //
            //function doGeo( position )
            //{
            //    var coords = position.coords.latitude + '+' + position.coords.longitude;
            //
            //}
            //
            //function lost()
            //{
            //    alert('Algo salió mal, Intentelo más tarde...');
            //}
            //navigator.geolocation.watchPosition(doGeo, lost, {maximumAge:0,enableHighAccuracy:true} );
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
                        //$rootScope.$apply();
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
            SearchService.userSearch(search)
                .then(function (response){
                        vm.restaurants = response.data.restaurants;
                    },
                    function (err){

                    })
        }

    }
})();