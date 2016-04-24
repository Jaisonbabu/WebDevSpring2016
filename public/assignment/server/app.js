module.exports = function (app,request,db,mongoose){

    var userModel = require("./models/user.model.js")(db,mongoose);

    var FormSchema = require("./models/form.schema.server.js")(mongoose);
    var FormModel =  mongoose.model('form',FormSchema);
    var formModel = require("./models/form.model.js")(db,mongoose,FormModel);

    var FieldSchema = require("./models/field.schema.server.js")(mongoose);
    var FieldModel =  mongoose.model('field',FieldSchema);
    var fieldModel = require("./models/field.model.js") (db,mongoose,FormModel,FieldModel);



    var userService  = require("./services/user.service.server.js")(app, userModel);
    var formService  = require("./services/form.service.server.js")(app,formModel);
    var fieldService = require("./services/field.service.server.js")(app,fieldModel);



    var FollowerSchema = require("../../Project/server/models/follower.schema.server.js")(mongoose);
    var FollowModel =  mongoose.model('follow',FollowerSchema);

    var RestaurantSchema = require("../../Project/server/models/restaurant.schema.server.js")(mongoose);
    var RestaurantModel = mongoose.model('hotel',RestaurantSchema);

    var userModelProject = require("../../Project/server/models/user.model.js")(db,mongoose,RestaurantModel,FollowModel);
    var userServiceProject = require("../../Project/server/services/user.service.server.js")(app,userModelProject);

    var reviewModel = require("../../Project/server/models/review.model.js")(request,db,mongoose,RestaurantModel);
    var searchService = require("../../Project/server/services/search.service.server.js")(app,request,reviewModel);
};
