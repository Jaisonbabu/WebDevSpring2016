"use strict";

(function(){
    angular
        .module("BonAppetit")
        .controller("HotelDetailController", HotelDetailController);

    function HotelDetailController($scope,$routeParams,SearchService){

        var resId = $routeParams.resId;
        console.log(resId);


        var successHandler = function (response){
            $scope.searchDetail = {
                                'name' : "temp"
            };
        };

        SearchService.getSearchDetail(resId)
        .then(successHandler,errorHandler);


    }
})();