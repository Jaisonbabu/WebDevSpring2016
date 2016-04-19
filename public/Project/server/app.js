module.exports = function (app,request,db,mongoose){

    var RestaurantSchema = require("./models/restaurant.schema.server.js")(mongoose);
    var RestaurantModel = mongoose.model('hotel',RestaurantSchema);

    var userModel = require("./models/user.model.js")(db,mongoose,RestaurantModel);
    var userService = require("./services/user.service.server.js")(app,userModel);

    var reviewModel = require("./models/review.model.js")(request,db,mongoose,RestaurantModel);
    var searchService = require("./services/search.service.server.js")(app,request,reviewModel);


};