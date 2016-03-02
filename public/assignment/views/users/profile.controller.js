"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, $rootScope, UserService) {

        console.log($rootScope.currentUser.username + " inside profile controller");
        $scope.user = $rootScope.currentUser;


       $scope.update = function (){
           console.log($rootScope.currentUser._id);

           var updateUserDetail = function (updatedUser) {
               console.log("inside update updateUsercallback");
               if (updatedUser != null) {
                   UserService.setUser(updatedUser);
               }
                console.log($rootScope.currentUser);
           }
           UserService.updateUser( $rootScope.currentUser._id, $scope.user, updateUserDetail);

        }
    }
})();