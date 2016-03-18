module.exports = function (app, userModel, formModel){

    app.post("/api/assignment/user",createUser);
    app.get("/api/assignment/user",updateUser);

    var userService = {
        create: createUser,
        update: updateUser

    };
    return userService;

    function createUser(req,res){
        var newUsers = userModel.createUser(req.body);
        res.json(newUsers);
    }

    function updateUser(req,res){

    }


};
