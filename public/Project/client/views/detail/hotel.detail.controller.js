"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("HotelDetailController", HotelDetailController);

    function HotelDetailController($scope,$routeParams,SearchService){

        var resId = $routeParams.id;
        console.log(resId);


        var successHandler = function (response){
            var detail = response.data;
            console.log(detail);
            $scope.searchDetail = {
                'name' : detail.name,
                'cuisines' : detail.cuisines,
                'currency' : detail.currency,
                'image' : detail.featured_image,
                'location':detail.location
            };
        };

        var errorHandler = function (err){
            $scope.error = "Please try again";
        };

        SearchService.getSearchDetail(resId)
        .then(successHandler,errorHandler);


    }
})();