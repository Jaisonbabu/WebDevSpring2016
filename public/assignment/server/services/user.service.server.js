module.exports = function (app, userModel){

    app.post("/api/assignment/user",createUser);
    app.get("/api/assignment/user",findUser);
    app.get("/api/assignment/user/:id",findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


    function createUser(req,res){
        console.log("req body "+JSON.stringify(req.body));
        var newUsers = userModel.createUser(req.body)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    console.log("model resolve server service");
                    console.log(JSON.stringify(doc));
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function updateUser(req,res){
        var updatedUser = userModel.updateUser(req.body,req.params.id);
        res.json(updatedUser);

    }

    function deleteUser(req,res){
        var users = userModel.deleteUser(req.params.id);
        res.json(users);
    }

    function findUserById(req,res){
        var user = userModel.findUserById(req.params.id);
        res.json(user);
    }

    function findUser(req,res){
        var userName = req.query.username;
        var password = req.query.password;
        var user = null;
        if (userName != null && password != null){
            var credentials = {username : userName, password : password};
            user = userModel.findUserByCredentials(credentials);
            res.json(user);
        }
        if(userName!=null && password == null){
            user = userModel.findUserByUsername(userName)
                //res.json(user);
                // handle model promise
                .then(
                    // login user if promise resolved
                    function ( doc ) {
                        console.log("model resolve server service");
                        console.log(JSON.stringify(user));
                        //req.session.currentUser = doc;
                        res.json(user);
                    },
                    // send error if promise rejected
                    function ( err ) {
                        res.status(400).send(err);
                    });
        }
        if(userName ==null && password == null){
            var users = userModel.findAllUsers();
            res.json(users);
        }
    }


};
