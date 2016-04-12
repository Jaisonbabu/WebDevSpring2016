module.exports = function (app, userModel){

    app.post("/api/project/user",createUser);
    app.get("/api/project/user",findUser);
    app.get("/api/project/user/:id",findUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);


    function createUser(req,res){
        console.log(req.body);
        var newUsers = userModel.createUser(req.body);
        res.json(newUsers);
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
            user = userModel.findUserByUsername(userName);
            res.json(user);
        }
        if(userName ==null && password == null){
            var users = userModel.findAllUsers();
            res.json(users);
        }
    }

};
