var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function (app, userModel,projectModel){

    var auth = authenticated;
    var loggedInUser;

    app.get("/api/assignment/user",findUser);
    app.get("/api/assignment/user/:id",findUserById);
    app.put("/api/assignment/user/:id", updateProfileUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    //admin

    app.post("/api/assignment/admin/user",       isAdmin,                  createUser);
    app.get('/api/assignment/admin/user',        isAdmin,                  findAllUsers);
    app.get('/api/assignment/admin/user/:id',    isAdmin,                  findUserById);
    app.delete('/api/assignment/admin/user/:id', isAdmin,                  deleteUser);
    app.put("/api/assignment/admin/user/:id",    isAdmin,                  updateUser);

    passport.use('assignment',   new LocalStrategy(assignmentLocalStrategy));
    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/assignment/login',    passport.authenticate('assignment'), assignmentLogin);
    app.post  ('/api/assignment/logout',   assignmentLogout);
    app.get   ('/api/assignment/loggedin', assignmentLoggedin);
    app.post  ('/api/assignment/register', assignmentRegister);

    app.post  ('/api/project/login',    passport.authenticate('project'), projLogin);
    app.post  ('/api/project/logout',   projLogout);
    app.get   ('/api/project/loggedin', projLoggedin);
    app.post  ('/api/project/register', projRegister);


    function assignmentLocalStrategy(username, password, done) {
        //console.log(username);
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log("Inside local strategy");
                    console.log(user);
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function projectLocalStrategy(username, password, done) {
        //console.log(username);
        projectModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log("Inside projeect strategy");
                    console.log(user);
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        if(user.type == 'assignment'){
            userModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        delete user.password;
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );

        }else if(user.type == "project"){
            projectModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        delete user.password;
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );

        }

    }

    function authenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function assignmentLogin(req, res) {
        var user = req.user;
        console.log("login server");
        loggedInUser = user;
        res.json(user);
    }

    function projLogin(req, res) {
        var user = req.user;
        console.log("login server");
        loggedInUser = user;
        res.json(user);
    }

    function assignmentLoggedin(req, res) {
        console.log("logged in");
        console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function projLoggedin(req, res) {
        console.log("logged in");
        console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function assignmentLogout(req, res) {
        req.logOut();
        res.send(200);
    }

    function projLogout(req, res) {
        req.logOut();
        res.send(200);
    }

    function isAdmin(req,res,next) {
        if(req.isAuthenticated()) {
            if(loggedInUser === undefined) {
                loggedInUser = req.user;
            }
            if(loggedInUser.roles.indexOf("admin") >= 0 || loggedInUser[0].roles.indexOf("admin") >= 0) {
                next();
            }

            else {
                res.send(403);
            }
        }
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function assignmentRegister(req,res){
        var newUser = req.body;
        console.log(JSON.stringify(newUser));
        newUser.roles = ['student','admin'];
        console.log(newUser);

        for(var i in newUser.emails){
            newUser.emails[i]=newUser.emails[i].trim();
        }

        userModel.findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        console.log(user);
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        console.log(" User Registered , login the user");
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                console.log("user logged in after registrations");
                                console.log(user);
                                loggedInUser = user;
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function projRegister(req,res){
        var newUser = req.body;
        console.log(JSON.stringify(newUser));
        console.log(newUser);

        for(var i in newUser.emails){
            newUser.emails[i]=newUser.emails[i].trim();
        }

        projectModel.findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        console.log(user);
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return projectModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        console.log(" User Registered , login the user");
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                console.log("user logged in after registrations");
                                console.log(user);
                                loggedInUser = user;
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function createUser(req, res) {
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }
        // first check if a user already exists with the username

        console.log("inside create user");
        console.log(newUser);
        userModel.findUserByUsername(newUser.username)
            .then(
                function (user) {
                    // if the user does not already exist
                    console.log(user);
                    if (user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function (user) {
                                    console.log("model create user");
                                    return userModel.findAllUsers();
                                },
                                function (err) {
                                    console.log("error");
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req,res){
        var newUser = req.body;

        console.log(JSON.stringify(req.body));
        console.log("update user");
        if (typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        for(var i in newUser.roles){
            newUser.roles[i]=newUser.roles[i].trim();
        }
        for(var i in newUser.emails){
            newUser.emails[i]=newUser.emails[i].trim();
        }

        newUser.password = bcrypt.hashSync(newUser.password);

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function (user) {
                    console.log("user updated servicwe");
                    return userModel.findAllUsers();

                },
                function (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            );
    }


    function updateProfileUser(req,res){
        var newUser = req.body;

        console.log(JSON.stringify(req.body));
        console.log("update user");
        if (typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        for(var i in newUser.roles){
            newUser.roles[i]=newUser.roles[i].trim();
        }
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
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                console.log("user logged in after registrations");
                                console.log(user);
                                loggedInUser = user;
                                res.json(user);
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
            .then(
                function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var userResponse = userModel.findUserById(userId)
            .then(
                function(doc) {
                    console.log("find user id ");
                    console.log(doc);
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
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
                        console.log(JSON.stringify(doc));
                        res.json(doc);
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
