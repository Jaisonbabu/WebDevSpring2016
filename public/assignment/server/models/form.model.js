// pass db and mongoose reference to model
module.exports = function (db,mongoose){

    var q = require('q');
    var forms = require("./form.mock.json");
    var newFormId = require('node-uuid');

    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model('form',FormSchema);

    var api = {
        findFormByUserId:findFormByUserId,
        findFormById:findFormById,
        deleteFormById:deleteFormById,
        createForm:createForm,
        updateFormById:updateFormById,
        findFormByTitle:findFormByTitle,
        // Field Functions
        createFieldForForm: createFieldForForm,
        getFieldsForForm:getFieldsForForm,
        getFieldForForm:getFieldForForm,
        deleteFieldFromForm:deleteFieldFromForm,
        updateField:updateField
    };

    return api;

    function findFormByUserId(userId){

        var deferred = q.defer();
        FormModel.find({userId : userId}, function(err,forms){
            if(err){
                deferred.reject(err);
            }
            else{
                console.log("Inside findFormByUserId");
                console.log(forms);
                deferred.resolve(forms);
            }
            return deferred.promise;
        });

        //var userForm=[];
        //for(var i in forms){
        //    if(forms[i].userId == userId){
        //        userForm.push(forms[i]);
        //    }
        //}
        //return userForm;
    }

    function findFormById(formId){
        var deferred = q.defer();
        FormModel.findById({_id : formId}, function(err,forms){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(forms);
            }

            return deferred.promise;
        });

        //for( var i in forms){
        //    if(forms[i]._id === formId){
        //        return forms[i];
        //    }
        //}
        //return null;
    }

    function deleteFormById(formId){
        //var form = findFormById(formId);
        //if(form != null){
        //    forms.splice(form,1);
        //    return findFormByUserId(form.userId);
        //}
        //else{
        //    return null;
        //}

        var deferred = q.defer();
        FormModel.remove({"_id":formId}, function(err,forms){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(forms);
            }
        });

        return deferred.promise;
    }

    function createForm(form, userId){
        console.log("createForm");
        console.log(form);
        if (!form || form.title !=""){
            var newForm = {
                title: form.title,
                userId : userId,
                fields : []
            };

            var deferred = q.defer();
            FormModel.create(newForm, function(err,form){
                if(err){
                    deferred.reject(err);
                    console.log(err);
                }
                else{
                    console.log("new form");
                    console.log(form);
                    var forms="";
                    forms = findFormByUserId(userId);
                    console.log("model success");
                    console.log(forms);
                    deferred.resolve(forms);
                }
            });

            return deferred.promise;
        }
        return null;

        //if (!form || form.title !=""){
        //    var newForm = {
        //        _id : newFormId.v1(),
        //        title: form.title,
        //        userId : userId,
        //        fields : []
        //    };
        //    forms.push(newForm);
        //    return findFormByUserId(userId);
        //}
        //return null;
    }

    function updateFormById(newForm,formId){
        if(newForm.title != "") {

            var deferred = q.defer();

            FormModel.findById({"_id":formId},function(err,form){
                if(err){
                    deferred.reject(err);
                }
                else{
                    form.title = newForm.title;
                    form.userId = newForm.userId;
                    form.fields = newForm.fields;
                    form.save(function(err,updatedForm){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(updatedForm);
                        }
                    });

                }

            });

            return deferred.promise;
            //for (var i in forms) {
            //    if (forms[i]._id === formId) {
            //        forms[i] = {
            //            _id: newForm._id,
            //            title: newForm.title,
            //            userId: newForm.userId,
            //            fields: newForm.fields
            //        };
            //        return findFormByUserId(newForm.userId);
            //    }
            //}
        }else{
            return null;
        }
    }

    function findFormByTitle(title){
        var deferred = q.defer();
        FormModel.findOne({title:title}, function(err, form){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(form);
            }
        });
        return deferred.promise;

        //for( var i in forms){
        //    if(forms[i].title === title){
        //        return forms[i];
        //    }
        //}
        //return null;
    }

    function getFieldsForForm(formId){
        var form = findFormById(formId);
        if(form != null){
            return form.fields;
        }else{
            return null;
        }
    }

    function createFieldForForm(formId,field){

        var newField = {
            _id:newFormId.v1(),
            type:field.type,
            placeholder:field.placeholder,
            label:field.label,
            options:field.options
        };
        for (var i in forms) {
            if (forms[i]._id == formId) {
                console.log("Inside server create");
                forms[i].fields.push(newField);
                console.log(JSON.stringify(forms[i].fields));
                return forms[i].fields;
            }
        }
    }

    function getFieldForForm(formId,fieldId){
        var form = findFormById(formId);
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