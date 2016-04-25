"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("PublicReviewController", PublicReviewController);

    function PublicReviewController ( $routeParams, $location,$anchorScroll, UserService, SearchService ) {

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
                        SearchService.getReviewsByUserId(user._id)
                            .then(function(rev){
                                if(rev){
                                    vm.reviews = rev.data;
                                }

                            },function(err){

                            });

                    },function(err){

                    }
                );


        }
        init();


        //vm.scrollTo = function(id) {
        //    var old = $location.hash();
        //    $location.hash(id);
        //    $anchorScroll();
        //    //reset to old to keep any additional routing logic from kicking in
        //    $location.hash(old);
        //};



    }
})();