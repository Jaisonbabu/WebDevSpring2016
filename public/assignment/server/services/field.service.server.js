module.exports = function (app, formModel){

    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.get("/api/assignment/form/:formId/field",getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId",getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);

    function createFieldForForm(req,res){
        var field = formModel.createFieldForForm(req.params.formId,req.body);
        res.json(field);
    }

    function getFieldsForForm(req,res){
        var fields = formModel.getFieldsForForm(req.params.formId);
        res.json(fields);
    }

    function getFieldForForm(req,res){
        var field = formModel.getFieldForForm(req.params.formId,req.params.fieldId);
        res.json(field);
    }

    function deleteFieldFromForm(req,res){
        var forms = formModel.deleteFieldFromForm(req.params.formId,req.params.fieldId);
        res.json(forms);
    }

    function updateField(req,res){
        var forms = formModel.updateField(req.params.formId,req.params.fieldId,req.body);
        res.json(forms);
    }

};