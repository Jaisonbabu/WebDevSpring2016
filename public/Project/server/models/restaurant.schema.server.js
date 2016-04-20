module.exports = function(mongoose){

    var RestaurantSchema = mongoose.Schema({
        resId : String,
        name : String,
        cuisines : String,
        currency : String,
        image : String,
        location : String,
        rating : String
    }, {collection: 'hotel'});
    return RestaurantSchema;
};
