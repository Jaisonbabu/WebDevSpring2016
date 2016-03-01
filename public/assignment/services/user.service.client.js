(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {
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
            updateUser: updateUser
        };

        return service;

        function findUserByCredentials(username, password, callback) {

            for (var i in users){
                if(users[i].username == username && users[i].password == password)
                {
                    callback(users[i]);
                }
            }

            callback(null);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback){
            user._id =  (new Date).getTime();
            users.push(user);
            callback(users);
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

        }
    }
})();