"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, $rootScope, UserService) {

        console.log($rootScope.currentUser.username + " inside profile controller");
        //UserService.checkLoggedIn();

        $scope.user = $rootScope.currentUser;
        //UserService.getCurrentUser()
        //    .then(
        //        function(response){
        //            $scope.user = response.data;
        //            if ( $scope.user == null) {
        //                $location.url("/");
        //            }
        //        }
        //    );
        console.log($scope.user);

        $scope.update = update;

        function update(user){

            UserService.updateUser( $rootScope.currentUser._id, user)
                .then(
                    function (updatedUser){
                        if (updatedUser.data != null) {
                            UserService.setUser(updatedUser.data);
                            $scope.message = "User updated successfully";
                        }
                        else
                        {
                            $scope.message = "Cannot update User";
                        }
                    },
                    function (error){
                        $scope.message = "Cannot update User";
                    });

        }
    }
})();