(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope, $location) {




        var userService = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            userExists: userExists,
            setUser: setUser,
            getUser: getUser,
            findUserbyId: findUserbyId,
            checkLoggedIn: checkLoggedIn,
            checkUserAdmin: checkUserAdmin

        };

        return userService;

        function findUserByCredentials(username, password) {
            console.log("inside client service");
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserbyId(userId){
            return $http.get("/api/assignment/user/:"+userId);
        }

        function findAllUsers() {
           return $http.get("/api/assignment/user");
        }

        function createUser(user){
            return $http.post("/api/assignment/user",user);
        }

        function deleteUserById(userId){
           return  $http.delete("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user){
            return $http.put("/api/assignment/user/"+userId, user);
            //var currentUser = findUserbyId(userId);
            //console.log(currentUser + "inside updateUser");
            //console.log(currentUser);
            //
            //if(currentUser != null){
            //    $.extend(true,currentUser,{
            //        firstName: user.firstName,
            //        lastName: user.lastName,
            //        username: user.username,
            //        password: user.password,
            //        email:user.email
            //    });
            //    callback(currentUser);
            //}
            //
            //callback(null);
        }

        function userExists(userName){
            for(var i in users){
                if(users[i].username == userName){
                    console.log(users[i].username );
                    return true;
                }
            }
            return false;
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