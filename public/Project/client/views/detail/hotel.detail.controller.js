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

        $scope.rate = 0;
        $scope.max = 5;
        $scope.isReadonly = false;
        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        var successHandler = function (response){
            var detail = response.data;
            console.log(detail);
            $scope.searchDetail = {
                'id': detail.id,
                'name' : detail.name,
                'cuisines' : detail.cuisines,
                'currency' : detail.currency,
                'image' : detail.featured_image,
                'location':detail.location,
                'rating': detail.user_rating,
                'phone':detail.phone_numbers
            };
        };

        var errorHandler = function (err){
            $scope.error = "Please try again";
        };

        SearchService.getSearchDetail(resId)
            .then(successHandler,errorHandler);

        $scope.createReview = createReview;
        $scope.addFav = addFav;
        $scope.reviews= null;

        function getRestaurantReviews(resId){
            SearchService.getReviewsByResId(resId)
                .then(function(rev){
                        $scope.reviews = rev.data;
                        if($scope.reviews.length > 0){
                            $scope.noReviews = false;
                        }else{
                            $scope.noReviews = true;
                        }

                    },
                    function(err){

                    })
        }

        getRestaurantReviews(resId);

        function createReview(review) {
            var newReview = {
                resId: resId,
                userId: currentUser._id,
                userName : currentUser.username,
                text: review.text,
                hotel: $scope.searchDetail,
                rating:$scope.rate
            };
            SearchService.addReview(newReview)
                .then(function (review) {
                        console.log(review.data);
                        getRestaurantReviews(review.data.resId);
                        $scope.review = null;
                        $scope.rate = 0;
                    },
                    function (err) {

                    })
        }

        function addFav(res){
            UserService.addUserFavorite(currentUser._id,res)
                .then(function(res){
                        alert("Favorite added");
                    },function(err){

                    }
                )
        }








    }
})();