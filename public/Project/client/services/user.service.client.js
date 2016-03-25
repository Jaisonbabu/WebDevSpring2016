(function(){

    angular
        .module("BonAppetitApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope, $location) {

        var userService = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setUser: setUser,
            getUser: getUser,
            findUserbyId: findUserbyId,
            checkLoggedIn: checkLoggedIn,
            checkUserAdmin: checkUserAdmin

        };

        return userService;

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+username);
        }

        function findUserbyId(userId){
            return $http.get("/api/project/user/:"+userId);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user){
            return $http.post("/api/project/user",user);
        }

        function deleteUserById(userId){
            return  $http.delete("/api/project/user/"+userId);
        }

        function updateUser(userId, user){
            console.log("inside client updateUser"+ user);
            return $http.put("/api/project/user/"+userId, user);
        }

        function checkLoggedIn(){
            if( $rootScope.currentUser == null){
                $location.url("/");
            }
        }

        function checkUserAdmin(){
            if( $rootScope.currentUser == null || currentUser.roles.indexOf('admin') >= 0){
                $location.url("/");
            }
        }

        function setUser(user){
            $rootScope.currentUser = user;
            // console.log("inside setUser "+ $rootScope.currentUser._id);
        }

        function getUser(){
            return $rootScope.currentUser;
        }


    }
})();