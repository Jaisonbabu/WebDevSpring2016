"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope,$rootScope, FormService,FieldService,UserService,$routeParams){

        var userId = $rootScope.currentUser._id;
        var formId = $routeParams.formId;

        FieldService.getFieldsForForm(formId)
            .then(function (formFields){
                    $scope.fields = formFields.data;
                    console.log($scope.fields);
                },
                function(err){

                });

        $scope.addField=addField;
        $scope.removeField=removeField;
        $scope.updateField=updateField;

        //$scope.fieldType = [
        //    {title : 'Single Line Text Field',va;},
        //    {title : 'Multiple Line Text Field'},
        //    {title : 'Date Field'},
        //    {title : 'Dropdown Field'},
        //    {title : 'Checkboxes Field'},
        //    {title : 'Radio Buttons Field'}
        //];
        //
        //$scope.newFieldOptions =  $scope.fieldType[0];
        //$scope.field = {newFieldOptions : $scope.newFieldOptions};

        var fieldTypes = [
            //Single Line Text Field
            {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
            //Multi Line Text Field
            {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
            //Date Field
            {"_id": null, "label": "New Date Field", "type": "DATE"},
            //DropDown Field
            {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]},
            //Checkboxes Field
            {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]},
            //Radio Buttons Field
            {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]}
        ];

        function addField(fieldTypeIndex){
            if (fieldTypeIndex) {
                FieldService.createFieldForForm(formId,fieldTypes[fieldTypeIndex])
                    .then(function (userFields){
                            $scope.fields = userFields.data;
                        },
                        function (err){

                        });
            }
            console.log(fieldTypes[fieldTypeIndex]);
        }

        function removeField(field){
            FieldService.deleteFieldFromForm(formId,field._id)
                .then(function (userFields){
                        $scope.fields = userFields.data;
                        console.log($scope.fields);
                    },
                    function (err){

                    });
        }

        function updateField(field){
            FieldService.updateField(formId,field._id,field)
                .then(function (userFields){
                        $scope.fields =userFields.data;
                        console.log($scope.fields);
                    },
                    function (err){

                    })
        }
    }
})();

