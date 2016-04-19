var q = require("q");

module.exports = function(db,mongoose,RestaurantModel) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('appUser',UserSchema);

    var FavoriteSchema = require("./favorites.schema.server.js")(mongoose);
    var FavoriteModel = mongoose.model('favorite',FavoriteSchema);


    var api = {
        createUser:createUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findAllUsers:findAllUsers,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        addUserFavorite:addUserFavorite,
        getUserFavorite:getUserFavorite
    };

    return api;

    function addUserFavorite(userId,restaurant){
        var deferred = q.defer();
        console.log("Inside Model");
        console.log(userId);
        FavoriteModel.findOne({userId: userId},
            function(err, userFav){
                if(err){
                    deferred.reject(err);
                }
                else{

                    var resId = restaurant.id;

                    if(userFav.resIds.indexOf(resId) == -1 ) {

                        userFav.resIds.push(resId);
                        userFav.save(function (err, userFavObj) {
                            if (err) {
                                deferred.reject(err);
                            } else {

                                storeHotel(restaurant);
                                deferred.resolve(userFavObj);
                            }
                        })
                    }
                    else{
                        deferred.resolve(null);
                    }
                }
            });
        return deferred.promise;
    }

    function storeHotel(hotel){
        var deferred = q.defer();
        console.log("Store hotel");
        console.log(hotel);
        RestaurantModel.create({
            resId: hotel.id,
            name : hotel.name,
            cuisines : hotel.cuisines,
            currency : hotel.currency,
            image : hotel.image,
            location : hotel.location,
            rating : hotel.rating

        },function(err,hotel){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(hotel);
            }
        });
        return deferred.promise;
    }

    function getUserFavorite(userId){
        var deferred = q.defer();
        FavoriteModel.findOne({userId: userId},
            function(err, userFav){
                if(err){
                    deferred.reject(err);
                }
                else{
                    if(userFav.resIds == 0){
                        deferred.resolve(null);
                    }
                    console.log("user found");
                    console.log(userFav);
                    RestaurantModel.find({$or: [{resId: {$in: userFav.resIds}}]},
                        function(err, favRes){
                            if(err){
                                deferred.reject(err);
                            }
                            else
                            {
                                console.log("favRes");
                                console.log(favRes);
                                deferred.resolve(favRes);
                            }
                        });
                }
            });
        return deferred.promise;
    }




    function createUser(user){

        // use q to defer the response
        var deferred = q.defer();
        var fullUser = {};
        console.log("Inside User Model");
        console.log(JSON.stringify(user));
        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, newUser) {
            if(err){
                deferred.reject(err);
            }else{
                FavoriteModel.create({userId: newUser._id, resIds: []},
                    function(err, userFav) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            //finalResult.bookFav = bookFavObj;
                            console.log("USER MODEL CREATE END");
                            deferred.resolve(newUser);
                        }
                    }
                );
            }
        });
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
                userFound.review = user.review;
                userFound.likes = user.likes;
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
        var deferred = q.defer();
        UserModel.findByIdAndRemove({"_id": userId}, function(err,users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();

        UserModel.find(
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

    function findUserById(userId){
        var deferred = q.defer();

        UserModel.findById(userId,
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

    //function createUser(user){
    //    console.log(user);
    //    var newUser = {
    //        _id : (new Date).getTime(),
    //        username :  user.username,
    //        password : user.password,
    //        email: user.email
    //    };
    //    console.log(newUser);
    //    users.push(newUser);
    //    return users;
    //}
    //
    //function updateUser(user, userId){
    //    console.log("inside updateUser "+userId+" "+user);
    //    for(var i in users){
    //        if(users[i]._id == userId){
    //            users[i].firstName = user.firstName;
    //            users[i].lastName = user.lastName;
    //            users[i].username = user.username;
    //            users[i].password = user.password;
    //            users[i].email = user.email;
    //
    //            return users[i];
    //        }
    //    }
    //    return null;
    //}
    //
    //function deleteUser(userId){
    //    var user = findUserById(userId);
    //    if(user != null){
    //        users.splice(user,1);
    //        return users;
    //    }
    //    else{
    //        return null;
    //    }
    //}
    //
    //function findAllUsers(){
    //    return users;
    //}
    //
    //function findUserById(userId){
    //    for(var i in users){
    //        if(users[i]._id == userId){
    //            return users[i];
    //        }
    //    }
    //    return null;
    //}
    //
    //
    //function findUserByUsername(userName){
    //    for(var i in users){
    //        if(users[i].username == userName){
    //            return users[i];
    //        }
    //    }
    //    return null;
    //}
    //
    //function findUserByCredentials(credentials){
    //    for (var i in users){
    //        if(users[i].username == credentials.username && users[i].password == credentials.password){
    //            return users[i];
    //        }
    //    }
    //    return null;
    //}

};