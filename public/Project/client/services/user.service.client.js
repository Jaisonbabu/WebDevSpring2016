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
            checkUserAdmin: checkUserAdmin,
            getCurrentUser: getCurrentUser,
            userLogin:userLogin,

            //favorites
            addUserFavorite:addUserFavorite,
            getUserFavorites:getUserFavorites,
            removeUserFavorite:removeUserFavorite,

            //follow
            addFriend: addFriend,
            findFriends:findFriends,
            findFollowers:findFollowers,
            removeFriend: removeFriend,

            logout:logout

        };

        return userService;

        function addFriend(userId,userName,friend){
            return $http.post("/api/project/"+userId+"/follow/"+userName,friend,{headers: {'Content-Type': 'application/json'} });
        }

        function findFriends(userId){
            return $http.get("/api/project/find/friends/"+userId);
        }

        function findFollowers(userId){
            return $http.get("/api/project/find/followers/"+userId);
        }

        function removeFriend(userId,fId){
            return $http.delete("/api/project/"+userId+"/friend/"+fId);
        }

        function userLogin(user){
            return $http.post("/api/project/login", user);
        }

        function findUserByCredentials(username,password) {
            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+username);
        }

        function findUserbyId(userId){
            return $http.get("/api/project/user/:"+userId);
        }

        function getCurrentUser(){
            return $http.get("/api/project/loggedin");
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user){
            return $http.post("/api/project/register",user,{headers: {'Content-Type': 'application/json'} });
        }

        function deleteUserById(userId){
            return  $http.delete("/api/project/user/"+userId);
        }

        function updateUser(userId, user){
            console.log("inside client updateUser");
            console.log(user);
            return $http.put("/api/project/user/"+userId, user);
        }

        function addUserFavorite(userId,res){
            return $http.post("/api/project/user/fav/"+userId,res,{headers: {'Content-Type': 'application/json'} });
        }

        function getUserFavorites(userId){
            return $http.get("/api/project/user/fav/"+userId);
        }

        function removeUserFavorite(userId,resId){
            return $http.delete("/api/project/user/"+userId+"/fav/"+resId);
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
            //console.log("inside setUser "+ $rootScope.currentUser._id);
        }

        function getUser(){
            return $rootScope.currentUser;
        }

    }
})();