
module.exports = function (){

    var forms = require("./form.mock.json");
    var newFormId = require('node-uuid');

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
        var userForm=[];
        for(var i in forms){
            if(forms[i].userId == userId){
                userForm.push(forms[i]);
            }
        }
        return userForm;
    }

    function findFormById(formId){
        for( var i in forms){
            if(forms[i]._id === formId){
                return forms[i];
            }
        }
        return null;
    }

    function deleteFormById(formId){
        var form = findFormById(formId);
        if(form != null){
            forms.splice(form,1);
            return findFormByUserId(form.userId);
        }
        else{
            return null;
        }
    }

    function createForm(form, userId){
        if (form != null && form.title != ""){
            var newForm = {
                _id : newFormId.v1(),
                title: form.title,
                userId : userId,
                fields : form.fields
            };
            forms.push(newForm);
            return findFormByUserId(userId);
        }
        return null;
    }

    function updateFormById(newForm,formId){
        if(newForm.title != "") {
            for (var i in forms) {
                if (forms[i]._id === formId) {
                    forms[i] = {
                        _id: newForm._id,
                        title: newForm.title,
                        userId: newForm.userId,
                        fields: newForm.fields
                    };
                    return findFormByUserId(newForm.userId);
                }
            }
        }else{
            return null;
        }
    }

    function findFormByTitle(title){
        for( var i in forms){
            if(forms[i].title === title){
                return forms[i];
            }
        }
        return null;
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
        var field  = getFieldForForm(formId,fieldId);
        var fields = getFieldsForForm(formId);
        if(field != null){
            fields.splice(field,1);
            return fields;
        }
        else{
            return null;
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
                            option: field.option
                        };
                        return forms[i].fields;
                    }
                }
            }
        }
    }
};