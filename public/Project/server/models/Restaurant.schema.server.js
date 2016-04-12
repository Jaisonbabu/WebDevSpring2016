module.exports = function(mongoose){

    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    var RestaurantSchema = mongoose.Schema({
        resId: String,
        title: String,
        fields: [FieldSchema],
        created: Date,
        updated: Date
        // set collection name to 'form'
    }, {collection: 'hotel'});
    return RestaurantSchema;
};