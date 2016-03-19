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

        FormService.findUserForms($scope.user._id)
        .then(function(forms){
                $scope.forms = forms.data;
            },
        function(err){

        });
        function setForm(){
            FormService.findUserForms($scope.user._id)
                .then(function(forms){
                        $scope.forms = forms.data;
                    },
                    function(err){

                    });
        }

        console.log($scope.forms);

        function addForm(form){

                FormService.createFormForUser($scope.user._id, form)
                    .then(function (forms){
                            setForm();
                            $scope.error = null;
                        },
                        function (err){
                            $scope.error = "No Forms";
                        });
        }

        function updateForm(form){

            var formUpdated = {
                _id : form._id,
                title : form.title,
                userId : form.userId
            };

            FormService.updateFormById(formUpdated._id, form)
            .then(function(forms){
                    if(forms != null){
                        setForm();
                        $scope.error = null;
                    }
                    else{
                        $scope.error = "Form name cannot be empty";
                    }
            },
            function(err){

            });



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