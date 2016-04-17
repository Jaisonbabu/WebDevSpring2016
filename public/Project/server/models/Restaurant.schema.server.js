module.exports = function(mongoose){

    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    var RestaurantSchema = mongoose.Schema({
        resId: String,
        name : String,
        cuisines : String,
        currency : String,
        image : String
    }, {collection: 'hotel'});
    return RestaurantSchema;
};