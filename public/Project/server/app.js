module.exports = function (app,request,db,mongoose){

    var userModel = require("./models/user.model.js")(db,mongoose);
    var userService = require("./services/user.service.server.js")(app,userModel);

    var reviewModel = require("./models/review.model.js")(request,db,mongoose);
    var searchService = require("./services/search.service.server.js")(app,request,reviewModel);


};