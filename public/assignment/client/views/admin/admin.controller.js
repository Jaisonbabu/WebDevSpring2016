"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, UserService) {
        UserService.checkLoggedIn();
        UserService.checkUserAdmin();
        $scope.$location = $location;

        vm.remove = remove;
        vm.update = update;
        vm.add    = add;
        vm.select = select;
        vm.sortField = 'username';
        vm.order = "false";

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();


        function handleSuccess(response) {

            for(var i in response.data) {
                response.data[i].roles = response.data[i].roles.toString();
            }
            vm.users = response.data;

        }

        function handleError(error) {
            vm.error = error;
        }


        function remove(user, index)
        {
            UserService
                .deleteUser(user._id)
                .then(function(response) {
                    vm.users.splice(index,1);
                });
        }

        function update(user)
        {
            UserService
                .updateUserById(user._id, user)
                .then(handleSuccess, handleError);
        }



        function add(user)
        {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function select(user)
        {
            vm.user = angular.copy(user);
        }

    }
})();