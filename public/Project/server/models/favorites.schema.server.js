module.exports = function(mongoose) {
    var FavoriteSchema =  mongoose.Schema({
            userId          : String,
            resIds          : [String]
        },
        {collection: "favorite"});
    return FavoriteSchema;
};