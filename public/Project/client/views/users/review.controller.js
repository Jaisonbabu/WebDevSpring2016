"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("ReviewController", ReviewController);

    function ReviewController (SearchService,UserService) {

        var vm = this;

        function init() {

            UserService.getCurrentUser()
                .then(function(user){
                    SearchService.getReviewsByUserId(user.data._id)
                        .then(function(rev){
                            vm.reviews = rev.data;

                        },function(err){

                        });
                });
            console.log(vm.currentUser);


        }
        init();







    }
})();