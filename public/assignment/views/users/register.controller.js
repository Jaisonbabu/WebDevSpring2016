"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService ) {

        $rootScope.user = null;
        $scope.register = function (user){

            if(user == null){
                $scope.error = ""
            }

          $rootScope.user = user;
            $location.url("/profile");




        };


    }
})();