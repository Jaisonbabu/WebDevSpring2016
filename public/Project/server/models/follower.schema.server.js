module.exports = function(mongoose) {
    var FollowerSchema =  mongoose.Schema({
            userId      : String,
            userName    : String,
            followerId  : String,
            followerName : String,
            notify      : String
        },
        {collection: "follow"});
    return FollowerSchema;
};