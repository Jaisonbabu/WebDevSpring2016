(function(){

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $rootScope) {

        var formService = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findUserForms : findUserForms,
            getCurrentForms: getCurrentForms
        };
        return formService;


        function createFormForUser(userId, form){
           return $http.post("/api/assignment/user/"+userId+"/form", form);
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

        function updateFormById(formId, newForm){
         return $http.put("/api/assignment/form/"+formId, newForm)
        }

        function findFormById(formId){
           return $http.get("/api/assignment/form/"+formId);
        }

        function findUserForms(userId){
            return $http.get("/api/assignment/user/"+userId+"/form");
        }

        function getCurrentForms(){
            return forms;
        }
    }


})();