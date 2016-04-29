"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ( $rootScope, UserService) {


        var vm = this;

        vm.update= update;


        function init() {
            vm.user = UserService.getUser();
        }
        init();


        function update(user){

            UserService.updateUser( $rootScope.currentUser._id, user)
                .then(
                    function (updatedUser){
                        if (updatedUser.data != null) {
                            UserService.setUser(updatedUser.data);
                            vm.message = "User updated successfully";
                        }
                        else
                        {
                            vm.message = "Cannot update User";
                        }
                    },
                    function (error){
                        vm.message = "Cannot update User";
                    }
                );
        }
    }
})();