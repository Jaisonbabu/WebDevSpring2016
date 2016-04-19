module.exports = function(mongoose){

    var ReviewSchema = mongoose.Schema({
        resId: String,
        resName : String,
        userId: String,
        userName:String,
        text: String,
        rating: Number,
        image:String,
        created: Date,
        updated: Date
    }, {collection: 'review'});
    return ReviewSchema;
};