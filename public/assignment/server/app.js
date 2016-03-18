module.exports = function (app){

    var userModel = require("./models/user.model.js",app);
    var formModel = require("./models/form.model.js",app);

    require("./services/user.service.server.js",app,usermodel,formmodel);
    require("./services/form.service.server.js",app,usermodel,formmodel);

};
