"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, UserService, FormService) {

        UserService.checkLoggedIn();


        $scope.error = null;
        $scope.selectedForm = null;

        $scope.addForm=addForm;
        $scope.updateForm=updateForm;
        $scope.deleteForm=deleteForm;
        $scope.selectForm=selectForm;

        $scope.user = UserService.getUser();
        $scope.forms = FormService.findUserForms($scope.user._id);


        function addForm(form){

            var newForm = function (form){
                if(form === null){
                    $scope.error = "Please enter form name";
                }else{
                    $scope.forms = FormService.findUserForms($scope.user._id);
                    //console.log(forms);
                    $scope.error = null;
                }
            };
            if (form != null && form.title != ""){
                FormService.createFormForUser($scope.user._id, form)
                    .then(function (form){
                            $scope.forms = FormService.findUserForms($scope.user._id);
                            //console.log(forms);
                            $scope.error = null;
                        },
                        function (err){

                        });
            }
            else{
                $scope.error = "Please enter form name";
            }


        }

        function updateForm(form){

            var formUpdated = {
                _id : form._id,
                title : form.title,
                userId : form.userId
            };
            var callback = function (updatedForm){
                if(updatedForm == null){
                    $scope.error = "Form name cannot be empty";
                }else{
                    $scope.forms = FormService.findUserForms($scope.user._id);
                    $scope.error = null;
                }
            };

            FormService.updateFormById(formUpdated._id, formUpdated, callback);

        }

        function deleteForm(index){

            var callback = function (forms){
                $scope.forms = FormService.findUserForms($scope.user._id);
                $scope.error = null;
            };
            FormService.deleteFormById($scope.forms[index]._id, callback);
        }

        function selectForm(index){
            $scope.selectedForm =$scope.forms[index];
            $scope.selectedIndex = index;
            $scope.form  =  {
                _id : $scope.selectedForm._id,
                title : $scope.selectedForm.title,
                userId : $scope.selectedForm.userId
            };
            console.log($scope.selectedForm);

        }
    }
})();