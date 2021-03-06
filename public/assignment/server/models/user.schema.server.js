module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: [String],
        phones: [String],
        roles : [String],
        type : {type : String, default : "assignment"}
        // set collection name to 'user'
    }, {collection: 'user'});
    return UserSchema;
};
