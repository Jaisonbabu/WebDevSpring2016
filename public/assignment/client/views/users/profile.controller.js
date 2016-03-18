"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, $location, $rootScope, UserService) {

        //console.log($rootScope.currentUser.username + " inside profile controller");
        UserService.checkLoggedIn();


        $scope.user = UserService.getUser();
        $scope.update = function (){

           var updateUserDetail = function (updatedUser) {
               console.log("inside update updateUsercallback");
               if (updatedUser != null) {
                   UserService.setUser(updatedUser);
                   $scope.message = "User updated successfully";
               }
                console.log($rootScope.currentUser);
           };
           UserService.updateUser( $rootScope.currentUser._id, $scope.user, updateUserDetail);
            UserService.updateUser( $rootScope.currentUser._id, $scope.user)
            .then(
                function (updatedUser){
                    if (updatedUser.data != null) {
                        UserService.setUser(updatedUser.data);
                        $scope.message = "User updated successfully";
                    }
            },
            function (error){

            });

        }
    }
})();