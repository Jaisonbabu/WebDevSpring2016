"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("HotelDetailController", HotelDetailController);

    function HotelDetailController($scope,$routeParams,UserService,SearchService){

        var resId = $routeParams.id;

        console.log(resId);

        var vm = this;
        var currentUser = "";

        function init() {
            UserService.getCurrentUser()
                .then(function(user){
                     currentUser = user.data;
                });
        }
        init();


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

        $scope.createReview = createReview;

        function createReview(review){
            var newReview = {
                resId: resId,
                userId: currentUser._id,
                text: review.text,
                created :  (new Date).getTime()
            };

            SearchService.addReview(newReview)
                .then(function (review){

                    },
                    function (err){

                    })
        }

    }
})();