module.exports = function (db,mongoose,formModel){

    var q = require('q');
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FormSchema = require("./form.schema.server.js")(mongoose);

    var fieldModel =  mongoose.model('field',FieldSchema);

    var api = {
        createFieldForForm: createFieldForForm,
        getFieldsForForm:getFieldsForForm,
        getFieldForForm:getFieldForForm,
        deleteFieldFromForm:deleteFieldFromForm,
        updateField:updateField
    };

    return api;

    function createFieldForForm(formId,field){

        // use q to defer the response
        var deferred = q.defer();
        var newField = new fieldModel(field);
        console.log("Inside Field Model");
        console.log(JSON.stringify(newField));

        formModel.findById(formId)
            .then(function (form) {
                form.fields.push(newField);
                form.save();
                deferred.resolve(form.fields);
            }, function (err){
                  deferred.reject(err);
            });

        return deferred.promise;

        //var newField = {
        //    _id:newFormId.v1(),
        //    type:field.type,
        //    placeholder:field.placeholder,
        //    label:field.label,
        //    options:field.options

        //for (var i in forms) {
        //    if (forms[i]._id == formId) {
        //        console.log("Inside server create");
        //        forms[i].fields.push(newField);
        //        console.log(JSON.stringify(forms[i].fields));
        //        return forms[i].fields;
        //    }
        //}


    }

    function getFieldsForForm(formId){
        var form = formModel.findFormById(formId);
        if(form != null){
            return form.fields;
        }else{
            return null;
        }
    }

    function getFieldForForm(formId,fieldId){
        var form = formModel.findFormById(formId);
        if (form != null){
            for (var i in form.fields){
                if(form.fields[i]._id == fieldId){
                    return form.fields[i];
                }
            }
        }
    }

    function deleteFieldFromForm(formId,fieldId){
        for (var i in forms) {
            if (forms[i]._id == formId) {
                for (var j in forms[i].fields){
                    if(forms[i].fields[j]._id == fieldId){
                        forms[i].fields.splice(j,1);
                        return forms[i].fields;
                    }
                }
            }
        }
    }

    function updateField(formId,fieldId,field){
        for (var i in forms) {
            if (forms[i]._id == formId) {
                for (var j in forms[i].fields){
                    if(forms[i].fields[j]._id == fieldId){
                        forms[i].fields[j] = {
                            _id : field._id,
                            label : field.label,
                            type: field.type,
                            placeholder: field.placeholder,
                            options: field.options
                        };
                        console.log(JSON.stringify(forms[i].fields[j].options));
                        return forms[i].fields;
                    }
                }
            }
        }
    }

};