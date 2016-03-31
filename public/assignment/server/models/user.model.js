// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db,mongoose) {
    var users = require("./user.mock.json");
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('user', UserSchema);

    var api = {
        createUser:createUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findAllUsers:findAllUsers,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials
    };

    return api;

    function createUser(user){
        //var newUser = {
        //    _id : (new Date).getTime(),
        //    username :  user.username,
        //    password : user.password,
        //    email: user.email
        //};
        //users.push(newUser);
        //return users;

        // use q to defer the response
        var deferred = q.defer();
        console.log(JSON.stringify(user));
        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {
            if(err){
                // reject promise if error
                deferred.reject(err);
            }else{
                // resolve promise
                deferred.resolve(doc);
            }
        });

        // return a promise
        return deferred.promise;
    }

    function updateUser(user, userId){
        console.log("inside updateUser "+userId+" "+user);
        for(var i in users){
            if(users[i]._id == userId){
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].username = user.username;
                users[i].password = user.password;
                users[i].email = user.email;

                return users[i];
            }
        }
        return null;
    }

    function deleteUser(userId){
        var user = findUserById(userId);
        if(user != null){
            users.splice(user,1);
            return users;
        }
        else{
            return null;
        }
    }

    function findAllUsers(){
        return users;
    }

    function findUserById(userId){
        for(var i in users){
            if(users[i]._id == userId){
                return users[i];
            }
        }
        return null;
    }


    function findUserByUsername(userName){
        //for(var i in users){
        //    if(users[i].username == userName){
        //        return users[i];
        //    }
        //}
        //return null;


        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            {username: userName},

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findUserByCredentials(credentials){
        for (var i in users){
            if(users[i].username == credentials.username && users[i].password == credentials.password){
                return users[i];
            }
        }
        return null;
    }

};