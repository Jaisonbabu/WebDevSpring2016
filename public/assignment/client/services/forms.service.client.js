(function(){

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {

        var formService = {
            createFormForUser: createFormForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findUserForms : findUserForms,
            findFormById:findFormById,
            getCurrentForms: getCurrentForms
        };
        return formService;


        function createFormForUser(userId, form){
           return $http.post("/api/assignment/user/"+userId+"/form", form);
        }

        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/"+formId);
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