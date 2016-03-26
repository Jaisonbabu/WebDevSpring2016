module.exports = function (app,request){

    var userModel = require("./models/user.model.js")();
    require("./services/user.service.server.js")(app, userModel);

    var searchModel = require("./models/search.model.js")(request);
    require("./services/search.service.server.js")(app,request);

};