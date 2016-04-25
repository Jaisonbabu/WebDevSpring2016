"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("PublicProfileController", PublicProfileController);

    function PublicProfileController ( $routeParams, $location,$anchorScroll, UserService ) {

        var vm = this;
        vm.profileUserName = $routeParams.username;

        function init() {

            UserService.findUserByUsername(vm.profileUserName)
            .then(function(user){
                vm.user = user.data;
            }, function (err){

            });

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