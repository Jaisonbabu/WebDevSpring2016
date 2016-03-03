(function(){

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $rootScope) {
        var forms = [];

        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var formService = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return formService;


        function createFormForUser(userId, form, callback){

            var newForm = {
                _id : (new Date).getTime(),
                title: form.title,
                userId : userId
            };
            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback){
            var userForm=[];
            for(var i in forms){
                if(forms[i].userId == userId){
                    userForm.push(forms[i]);
                }
            }
            callback(userForm);
        }

        function deleteFormById(formId, callback){

            forms = forms.filter( function(form){
                return form._id != formId;
            });
            callback(forms);
        }

        function updateFormById(formId, newForm, callback){
            for (var i in forms){
                if(forms[i] === formId){
                    forms[i]._id = newForm._id;
                    forms[i].title = newForm.title;
                    forms[i].userId = newForm.userId;

                    callback(forms[i]);
                }
            }
            callback(null);
        }
    }

})();