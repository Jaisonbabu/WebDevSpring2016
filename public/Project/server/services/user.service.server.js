module.exports = function (app, userModel){

    app.post("/api/project/user",createUser);
    app.get("/api/project/user",findUser);
    app.get("/api/project/user/:id",findUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

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

    function updateUser(req,res){
        userModel.updateUser(req.body,req.params.id)
            .then( function(updatedUser){
                    res.json(updatedUser);
                },
                function(err){
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

    function findUser(req,res){
        var userName = req.query.username;
        var password = req.query.password;
        var user = null;
        if (userName != null && password != null){
            var credentials = {username : userName, password : password};
            userModel.findUserByCredentials(credentials)
                .then( function(user){
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

    //function createUser(req,res){
    //    console.log(req.body);
    //    var newUsers = userModel.createUser(req.body);
    //    res.json(newUsers);
    //}
    //
    //function updateUser(req,res){
    //    var updatedUser = userModel.updateUser(req.body,req.params.id);
    //    res.json(updatedUser);
    //
    //}
    //
    //function deleteUser(req,res){
    //    var users = userModel.deleteUser(req.params.id);
    //    res.json(users);
    //}
    //
    //function findUserById(req,res){
    //    var user = userModel.findUserById(req.params.id);
    //    res.json(user);
    //}
    //
    //function findUser(req,res){
    //    var userName = req.query.username;
    //    var password = req.query.password;
    //    var user = null;
    //    if (userName != null && password != null){
    //        var credentials = {username : userName, password : password};
    //        user = userModel.findUserByCredentials(credentials);
    //        res.json(user);
    //    }
    //    if(userName!=null && password == null){
    //        user = userModel.findUserByUsername(userName);
    //        res.json(user);
    //    }
    //    if(userName ==null && password == null){
    //        var users = userModel.findAllUsers();
    //        res.json(users);
    //    }
    //}

};
