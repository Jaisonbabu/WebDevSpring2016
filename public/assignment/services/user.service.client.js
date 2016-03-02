(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var users = [];

        users = [
                    {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                         "username":"alice",  "password":"alice",   "roles": ["student"]		},
                    {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                        "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                    {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                        "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                    {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                        "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                    {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                        "username":"ed",     "password":"ed",      "roles": ["student"]		}
                ];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            userExists: userExists,
            setUser: setUser,
            getUser: getUser,
            findUserbyId: findUserbyId

        };

        return service;

        function findUserByCredentials(username, password, callback) {

            for (var i in users){
                if(users[i].username == username && users[i].password == password)
                    callback(users[i]);
            }

            callback(null);
        }

        function findUserbyId(userId){
            for(var i in users){
                if(users[i]._id == userId){
                    return users[i];
                }
            }
            return null;
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback){

            var newUser = {
                _id : (new Date).getTime(),
                username :  user.username,
                password : user.password,
                email: user.email

            };
            users.push(newUser);
            console.log(users);
            callback(newUser);
        }

        function deleteUserById(userId, callback){
            for(var i in users){
                if(users[i]._id == userId){
                    users.pop(users[i]);
                    callback(users);
                }
            }
        }

        function updateUser(userId, user, callback){
            var currentUser = findUserbyId(userId);
            console.log(currentUser + "inside updateUser");
            console.log(currentUser);

            if(currentUser != null){
                var currentUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    password: user.password,
                    email:user.email
                }
                callback(currentUser);
            }

            callback(null);
        }

        function userExists(userName){
            for(var i in users){
                if(users[i].username == userName){
                    return true;
                    console.log(users[i].username );
                }
            }
            return false;
        }

        function setUser(user){
            $rootScope.currentUser = user;
            console.log("inside setUser "+ $rootScope.currentUser.username);
        }

        function getUser(user){
            return $rootScope.currentUser = user;
        }





    }
})();