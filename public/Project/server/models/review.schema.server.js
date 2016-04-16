module.exports = function(mongoose){

    var ReviewSchema = mongoose.Schema({
        resId: String,
        userId: String,
        userName:String,
        text: String,
        created: Date,
        updated: Date
    }, {collection: 'review'});
    return ReviewSchema;
};