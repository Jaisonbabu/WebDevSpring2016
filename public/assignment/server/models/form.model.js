
module.exports = function (){

    var forms = require("./form.mock.json");
    var newFormId = require('node-uuid');

    var api = {
        findFormByUserId:findFormByUserId,
        findFormById:findFormById,
        deleteFormById:deleteFormById,
        createForm:createForm,
        updateFormById:updateFormById,
        findFormByTitle:findFormByTitle
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
            return forms;
        }
        else{
            return null;
        }
    }

    function createForm(form, userId){
       // TODO: Check this is in client
        if (form != null && form.title != ""){
            var newForm = {
                _id : newFormId.v1(),
                title: form.title,
                userId : userId,
                fields : form.fields
            };
            forms.push(newForm);
            return forms;
        }
        return null;
    }

    function updateFormById(newForm,formId){
        for (var i in forms){
            if(forms[i]._id === formId){
                forms[i] ={
                    _id : newForm._id,
                    title : newForm.title,
                    userId : newForm.userId,
                    fields : newForm.fields
                };

                return forms;
                }
            }
            return null;
    }

    function findFormByTitle(title){
        for( var i in forms){
            if(forms[i].title === title){
                return forms[i];
            }
        }
        return null;
    }
};