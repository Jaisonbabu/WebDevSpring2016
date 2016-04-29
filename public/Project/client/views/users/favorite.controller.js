"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("FavoriteController", FavoriteController);

    function FavoriteController ($scope,SearchService,UserService) {

        var vm = this;


        $scope.removeUserFav = removeUserFav;

        function init() {

            UserService.getCurrentUser()
                .then(function(user){
                    vm.currentUser = user.data;
                    UserService.getUserFavorites(user.data._id)
                        .then(function(fav){
                            if(fav.data != null){
                                vm.restaurants = fav.data.resFav;
                            }

                        },function(err){

                        });
                });
        }
        init();


        function removeUserFav(resId){
            UserService.removeUserFavorite($scope.currentUser._id,resId)
                .then(function(usersFav){
                    console.log(userFav.data);
                    UserService.getUserFavorites($scope.currentUser._id)
                        .then(function(fav){
                            vm.restaurants = fav.data.resFav;
                            alert("Removed from favorites");
                        },function(err){

                        });
                },function(err){
                    alert("Removed from favorites");
                });
        }

    }
})();