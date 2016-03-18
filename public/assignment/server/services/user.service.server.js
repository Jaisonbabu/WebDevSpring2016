module.exports = function (app, userModel){

    app.post("/api/assignment/user",createUser);
    app.get("/api/assignment/user",findUser);
    app.get("/api/assignment/user/:id",findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


    function createUser(req,res){
        var newUsers = userModel.createUser(req.body);
        res.json(newUsers);
    }

    function updateUser(req,res){
        var updatedUser = userModel.updateUser(req.body,req.params.id);
            res.json(updatedUser);

    }

    function deleteUser(req,res){
        var users = userModel.deleteUser(req.params.id);
        if(users != null){
            res.json(users);
        }
        else{
            res.json({message: "Cannot Delete"});
        }
    }

    function userResponse(user,res){
        if(user != null){
            res.json(user);
        }
        else{
            res.json({message: "Cannot find user"});
        }
    }

    function findUserById(req,res){
        var user = userModel.findUserById(req.params.id);
        userResponse(user,res);
    }

    function findUser(req,res){
        var userName = req.query.username;
        var password = req.query.password;
        console.log("Inside findUser");

        if (userName != null && password != null){
            var credentials = {username : userName, password : password};
            var user = userModel.findUserByCredentials(credentials);
            userResponse(user,res);
        }
        if(userName!=null && password == null){
            var user = userModel.findUserByUsername(userName);
            userResponse(user,res);
        }
        if(userName ==null && password == null){
            var users = userModel.findAllUsers();
            res.json(users);
        }
    }


};
