module.exports = function (db,mongoose,FormModel,FieldModel){

    var q = require('q');
    var newFieldId = require('node-uuid');

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
        var newField = {
            type:field.type,
            placeholder:field.placeholder,
            label:field.label,
            options:field.options};

        FieldModel.create(newField, function(err,field){
            if(!err){

                console.log("Inside Field Model");
                console.log(JSON.stringify(newField));

                FormModel.findById(formId)
                    .then(function (form) {
                        form.fields.push(newField);
                        form.save(function(err,newForm){
                            if(err){
                                deferred.reject(err);
                                console.log(err);
                            }else{
                                console.log(newForm);
                                deferred.resolve(newForm.fields);
                            }
                        })

                    }, function (err){
                        deferred.reject(err);
                    });

            }
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
        var deferred = q.defer();
        FormModel.findById(formId,
            function(err,form){
                if(err){
                    deferred.reject(err);
                }
                else{
                    console.log("All forms");
                    console.log(form);
                    deferred.resolve(form.fields);
                }
            });
        return deferred.promise;
        //var form = FormModel.findFormById(formId);
        //if(form != null){
        //    return form.fields;
        //}else{
        //    return null;
        //}
    }

    function getFieldForForm(formId,fieldId){
        var deferred = q.defer();
        FormModel.find({"_id":formId,"fields._id":fieldId},
            function(err,form){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(form.fields[0]);
                }

            });
        return deferred.promise;

        //var form = FormModel.findFormById(formId);
        //if (form != null){
        //    for (var i in form.fields){
        //        if(form.fields[i]._id == fieldId){
        //            return form.fields[i];
        //        }
        //    }
        //}
    }

    function deleteFieldFromForm(formId,fieldId){
        var deferred = q.defer();
        FormModel.findById(formId,
            function(err,form){
                if(err){
                    deferred.reject(err);
                }
                else{
                    form.fields.pull({_id: fieldId});
                    form.save(function (err,newForm){
                        if(err){
                            deferred.reject(err);
                        }else{
                            deferred.resolve(newForm.fields);
                        }
                    });
                }

            });
        return deferred.promise;

        //for (var i in forms) {
        //    if (forms[i]._id == formId) {
        //        for (var j in forms[i].fields){
        //            if(forms[i].fields[j]._id == fieldId){
        //                forms[i].fields.splice(j,1);
        //                return forms[i].fields;
        //            }
        //        }
        //    }
        //}
    }

    function updateField(formId,fieldId,field){

        var deferred = q.defer();
        FormModel.findById(formId)
            .then(function(form){
                var newField = form.fields.id(fieldId);
                newField.type = field.type;
                newField.placeholder = field.placeholder;
                newField.label = field.label;
                newField.options = field.options;
                form.save(function(err,form){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(form.fields);
                    }
                });
            },function(err){
                deferred.reject(err);
            });

        return deferred.promise;

        //for (var i in forms) {
        //    if (forms[i]._id == formId) {
        //        for (var j in forms[i].fields){
        //            if(forms[i].fields[j]._id == fieldId){
        //                forms[i].fields[j] = {
        //                    _id : field._id,
        //                    label : field.label,
        //                    type: field.type,
        //                    placeholder: field.placeholder,
        //                    options: field.options
        //                };
        //                console.log(JSON.stringify(forms[i].fields[j].options));
        //                return forms[i].fields;
        //            }
        //        }
        //    }
        //}
    }

};