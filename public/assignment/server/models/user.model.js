// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db,mongoose) {
    var users = require("./user.mock.json");
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('user',UserSchema);

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

        // use q to defer the response
        var deferred = q.defer();
        console.log("Inside User Model");
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
        console.log(user);
        var deferred = q.defer();

        UserModel.findById({_id:userId}, function(err,userFound){
            if(err){
                deferred.reject(err);
            }
            else{
                userFound.username = user.username;
                userFound.firstName = user.firstName;
                userFound.lastName = user.lastName;
                userFound.password = user.password;
                userFound.email = user.email;
                userFound.phones = user.phones;
                userFound.roles = user.roles;
                userFound.save(function(err,userUpdated){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(userUpdated);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteUser(userId){
        console.log(userId);
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                console.log("user deleted");
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }



    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findUserByUsername(userName){
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
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

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

};