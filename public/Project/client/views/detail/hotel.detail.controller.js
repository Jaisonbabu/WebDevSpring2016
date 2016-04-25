"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("HotelDetailController", HotelDetailController);

    function HotelDetailController($scope,$routeParams,UserService,SearchService){

        var resId = $routeParams.id;

        console.log(resId);

        var vm = this;

        $scope.userFav = null;

        function init() {
            UserService.getCurrentUser()
                .then(function(user){
                    $scope.currentUser = user.data;
                    if ($scope.currentUser != ""){
                        UserService.getUserFavorites(user.data._id)
                            .then(function(fav){
                                $scope.userFav = fav.data;
                                console.log($scope.userFav);

                            },function(err){

                            });
                    }

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
                'phone':detail.phone_numbers,
                'priceRange':detail.price_range,
                'avgCost': detail.average_cost_for_two
            };
        };

        var errorHandler = function (err){
            $scope.error = "Please try again";
        };

        SearchService.getSearchDetail(resId)
            .then(successHandler,errorHandler);

        $scope.createReview = createReview;
        $scope.addOrRemoveFav = addOrRemoveFav;
        $scope.getFavButtonState = getFavButtonState;
        $scope.getFavButtonColor = getFavButtonColor;
        $scope.reviews= null;



        function getFavButtonState(res){
            if($scope.userFavRes.indexOf(res.id) == -1){
                //console.log("setting state auto");
                return "auto";
            }
            //console.log("setting state none");
            return "none";
        }

        function getFavButtonColor(res){
            if($scope.userFavRes.indexOf(res.id) == -1){
                //console.log("setting color red");
                return "yellow";
            }
            //console.log("setting color Grey");
            return "blue";
        }

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
                userId: $scope.currentUser._id,
                userName : $scope.currentUser.username,
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

        function addOrRemoveFav(){
            if(!$scope.userFav || !$scope.userFav.resIds || $scope.userFav.resIds.indexOf($scope.searchDetail.id) == -1){
                UserService.addUserFavorite($scope.currentUser._id,$scope.searchDetail)
                    .then(function(res){

                            UserService.getUserFavorites($scope.currentUser._id)
                                .then(function(fav){
                                    $scope.userFav = fav.data;
                                    console.log($scope.userFav);
                                    alert("Favorite added");

                                },function(err){

                                });
                        },function(err){

                        }
                    )
            }else{
                UserService.removeUserFavorite($scope.currentUser._id,$scope.searchDetail.id)
                    .then(function(usersFav){
                        console.log(usersFav.data);
                        UserService.getUserFavorites($scope.currentUser._id)
                            .then(function(fav){
                                $scope.userFav = fav.data;
                                alert("Removed from favorites");
                            },function(err){

                            });
                    },function(err){
                        alert("Removed from favorites");
                    });
            }


        }








    }
})();