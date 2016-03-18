var users = require("user.mock.json");
module.exports = function(app, userModel, formModel) {

    function createUser(user){
        var newUser = {
            _id : (new Date).getTime(),
            username :  user.username,
            password : user.password,
            email: user.email

        };
        users.push(newUser);
        return users;
    }

    function findUserByUsername(userName){
        for(var i in users){
            if(users[i].username == userName){
                return users[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials){

    }

};