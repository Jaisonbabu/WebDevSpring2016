module.exports = function (app, fieldModel){

    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.get("/api/assignment/form/:formId/field",getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId",getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);

    function createFieldForForm(req,res){
        var fields = fieldModel.createFieldForForm(req.params.formId,req.body)
            .then( function(fields){
                    res.json(fields);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getFieldsForForm(req,res){
        var fields = fieldModel.getFieldsForForm(req.params.formId);
        res.json(fields);
    }

    function getFieldForForm(req,res){
        var field = fieldModel.getFieldForForm(req.params.formId,req.params.fieldId);
        res.json(field);
    }

    function deleteFieldFromForm(req,res){
        var forms = fieldModel.deleteFieldFromForm(req.params.formId,req.params.fieldId);
        res.json(forms);
    }

    function updateField(req,res){
        var forms = fieldModel.updateField(req.params.formId,req.params.fieldId,req.body);
        res.json(forms);
    }

};