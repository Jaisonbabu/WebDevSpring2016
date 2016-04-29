"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("ReviewController", ReviewController);

    function ReviewController (SearchService,UserService) {

        var vm = this;
        vm.reviews = null;

        function init() {

            UserService.getCurrentUser()
                .then(function(user){
                    SearchService.getReviewsByUserId(user.data._id)
                        .then(function(rev){
                            if(rev.data.length > 0){
                                vm.reviews = rev.data;
                            }

                        },function(err){

                        });
                });

        }
        init();


    }
})();