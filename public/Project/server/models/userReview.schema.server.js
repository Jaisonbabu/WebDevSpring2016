module.exports = function(mongoose) {
    var userReview =  mongoose.Schema({
            userId: String,
            reviewIds: [String]

        },
        {collection: "review"});

    return userReview;
};
