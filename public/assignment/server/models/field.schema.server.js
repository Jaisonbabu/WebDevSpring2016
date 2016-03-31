module.exports = function(mongoose){

    var FieldSchema = mongoose.Schema({
        label: String,
        type:{ type: String, default: "TEXT" },
        placeholder: String,
        options:[{
            label: String,
            value: String}]
        // set collection name to 'field'
    }, {collection: 'field'});
    return FieldSchema;
};
