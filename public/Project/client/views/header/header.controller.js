"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($rootScope, $location, UserService) {

        var vm = this;

        vm.logout = logout;

        //vm.register = register;
        //vm.login = login;
        //vm.username = showUsername;
        //vm.showLogout = showLogout;

        function init() {
            vm.$location = $location;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setUser(null);
                    $location.url("/");
                });
        }


                   //function register(){
        //    if($rootScope.currentUser) {
        //        if ($rootScope.currentUser != null) {
        //            return true;
        //        }
        //    }
        //    else {
        //        return false;
        //    }
        //}
        //
        //function showUsername(){
        //
        //    if ($rootScope.currentUser == null) {
        //        return true;
        //    }
        //    else{
        //         vm.user = $rootScope.currentUser;
        //        //model.username = user[0].toUpperCase() + user.slice(1);
        //    }
        //}
        //
        //function login(){
        //    if($rootScope.currentUser) {
        //        if ($rootScope.currentUser != null) {
        //            return true;
        //        }
        //    }
        //    return false;
        //}
        //
        //function showLogout(){
        //    if($rootScope.currentUser == null){
        //        return true;
        //    }
        //    return false;
        //}


    }
})();