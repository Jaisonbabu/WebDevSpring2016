module.exports = function(mongoose){

    var ReviewSchema = mongoose.Schema({
        resId: String,
        userId: String,
        userName:String,
        text: String,
        rating: Number,
        created: Date,
        updated: Date
    }, {collection: 'review'});
    return ReviewSchema;
};