module.exports = function (app,db,mongoose){

    var userModel = require("./models/user.model.js")(db,mongoose);
    require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.js")(db,mongoose);
    require("./services/form.service.server.js")(app,formModel);
    require("./services/field.service.server.js")(app,formModel);
};
