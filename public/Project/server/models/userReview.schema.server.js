module.exports = function(mongoose) {
    var userReview =  mongoose.Schema({
            userId: String,
            reviewIds: [String]

        },
        {collection: "bukreview.test4.bookfav"});

    return breBookFavSchema;
};
