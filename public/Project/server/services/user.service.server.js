var bcrypt = require("bcrypt-nodejs");


module.exports = function (app, userModel){

    app.post("/api/project/user",createUser);
    app.get("/api/project/user",findUser);
    //app.get("/api/project/loggedin", loggedin);
    //app.post("/api/project/logout", logout);
    app.get("/api/project/user/:id",findUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);


    //user favorite

    app.post("/api/project/user/fav/:userId",addUserFavorite);
    app.get("/api/project/user/fav/:userId",getUserFavorite);
    app.delete("/api/project/user/:userId/fav/:resId",removeUserFavorite);

    //user follow

    app.post("/api/project/:userId/follow/:userName", addFriend);
    app.get("/api/project/find/friends/:userId", findFriends);
    app.get("/api/project/find/followers/:userId", findFollowers);
    app.delete("/api/project/:userId/friend/:fId", removeFriend);


    function addFriend(req,res){
        console.log(req.params.userName);

       userModel.addFriend(req.params.userId,req.params.userName,req.body)
           .then(
               function (doc) {
                   console.log("Inside user web service");
                   console.log(JSON.stringify(doc));
                   res.json(doc);
               },
               function ( err ) {
                   res.status(400).send(err);
               });
    }

    function removeFriend(req,res){
        userModel.removeFriend(req.params.userId,req.params.fId)
            .then(
                function (doc) {
                    console.log("Inside user web service");
                    console.log(JSON.stringify(doc));
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function findFriends (req,res){
        console.log(req.params.userId);

        userModel.findFriends(req.params.userId)
            .then(
                function (doc) {
                    console.log("Inside user web service");
                    console.log(JSON.stringify(doc));
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function findFollowers (req,res){
        console.log(req.params.userId);

        userModel.findFollowers(req.params.userId)
            .then(
                function (doc) {
                    console.log("Inside user web service");
                    console.log(JSON.stringify(doc));
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }


    function createUser(req,res){
        var user = req.body;
        console.log("req body in web service:"+JSON.stringify(req.body));
        userModel.createUser(user)
            .then(
                function (doc) {
                    console.log("Inside user web service");
                    console.log(JSON.stringify(doc));
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    //function updateUser(req,res){
    //    userModel.updateUser(req.body,req.params.id)
    //        .then( function(updatedUser){
    //                res.json(updatedUser);
    //            },
    //            function(err){
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    function updateUser(req,res){
        var newUser = req.body;

        console.log(JSON.stringify(req.body));
        console.log("update Project user");

        for(var i in newUser.emails){
            newUser.emails[i]=newUser.emails[i].trim();
        }

        newUser.password = bcrypt.hashSync(newUser.password);

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function (user) {
                    console.log("user updated servicwe");
                    //return userModel.findAllUsers();
                    return userModel.findUserById(req.params.id)
                },
                function (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    //res.json(users);

                    if (user) {
                        console.log(" User Registered , login the user");
                        console.log(user);
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                console.log("user logged in after registrations");
                                console.log(user);
                                loggedInUser = user;
                                setTimeout(function  (){
                                    res.json(user);
                                },600);

                            }
                        });
                    }
                },
                function (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req,res){
        userModel.deleteUser(req.params.id)
            .then(function(updatedUser){
                    res.json(updatedUser);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function findUserById(req,res){
        userModel.findUserById(req.params.id)
            .then(function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                });
    }


    function addUserFavorite(req, res){

        userModel.addUserFavorite(req.params.userId, req.body)
            .then(function(userFav){
                    res.json(userFav);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function getUserFavorite(req, res){
        console.log(req.params.userId);
        userModel.getUserFavorite(req.params.userId)
            .then(function(userFavs){
                    res.json(userFavs);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function removeUserFavorite(req,res){

        userModel.removeUserFavorite(req.params.userId,req.params.resId)
            .then(function(userFavs){
                    console.log("user fav deleted");
                    console.log(userFavs);
                    res.json(userFavs);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function findUser(req,res){
        var userName = req.query.username;
        var password = req.query.password;
        var user = null;
        if (userName != null && password != null){
            var credentials = {username : userName, password : password};
            userModel.findUserByCredentials(credentials)
                .then( function(user){
                        //req.session.currentUser = user;
                        res.json(user);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        }
        if(userName!=null && password == null){
            userModel.findUserByUsername(userName)
                // handle model promise
                .then(
                    // login user if promise resolved
                    function(doc) {
                        console.log("Inside user web service findByUsername");
                        //console.log(JSON.stringify(doc));
                        res.json(doc);
                    },
                    // send error if promise rejected
                    function ( err ) {
                        res.status(400).send(err);
                    });
        }
        if(userName ==null && password == null){
            userModel.findAllUsers()
                .then(function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    });
        }
    }

    //function loggedin(req,res){
    //    res.json(req.session.currentUser);
    //}
    //
    function logout(req, res) {
        //req.session.destroy();
        res.send(200);
    }


};
