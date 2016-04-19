"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("FavoriteController", FavoriteController);

    function FavoriteController (SearchService,UserService) {

        var vm = this;

        function init() {

            UserService.getCurrentUser()
                .then(function(user){
                    UserService.getUserFavorites(user.data._id)
                        .then(function(fav){
                            vm.restaurants = fav.data;

                        },function(err){

                        });
                });
            console.log(vm.currentUser);


        }
        init();






    }
})();