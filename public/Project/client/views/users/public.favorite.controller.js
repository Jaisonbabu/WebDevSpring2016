"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("PublicFavoriteController", PublicFavoriteController);

    function PublicFavoriteController ( $routeParams, $location,$anchorScroll, UserService  ) {

        var vm = this;
        vm.profileUserName = $routeParams.username;

        function init() {

            UserService.findUserByUsername(vm.profileUserName)
                .then(function(user){
                    vm.user = user.data;
                    return vm.user;
                }, function (err){

                })
                .then(
                    function(user){
                        UserService.getUserFavorites(user._id)
                            .then(function(fav){
                                if(fav.data){
                                    vm.restaurants = fav.data.resFav;
                                    return user;
                                }
                                return user;
                            },function(err){

                            })


                    },function(err){

                    }
                );

            //vm.scrollTo = function(id) {
            //    var old = $location.hash();
            //    $location.hash(id);
            //    $anchorScroll();
            //    //reset to old to keep any additional routing logic from kicking in
            //    $location.hash(old);
            //};


        }
        init();



    }
})();