module.exports = function(mongoose){

    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phones: String,
        review: [ReviewSchema],
        likes:[String],
        friends : [String],
        type : {type : String, default : "project"}
    }, {collection: 'appUser'});
    return UserSchema;
};
