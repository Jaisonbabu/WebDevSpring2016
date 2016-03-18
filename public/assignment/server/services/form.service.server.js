module.exports = function (app, formModel){

    app.get("/api/assignment/user/:userId/form", findFormByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);


    function findFormByUserId(req,res){
        var forms = formModel.findFormByUserId(req.params.userId);
        if(forms.length > 0){
            res.json(forms);
        }
        else{
            res.json({message: "Cannot find forms"});
        }
    }

    function findFormById(req,res){
        var form = formModel.findFormById(req.params.formId);
        formResponse(form);
    }

    function deleteFormById(req,res){
        var forms = formModel.deleteFormById(req.params.formId);
        if(forms != null){
            res.json(forms);
        }
        else{
            res.json({message: "Cannot delete form"});
        }
    }

    function createForm(req,res){
        var newForms = formModel.createForm(req.body, req.params.userId);
        res.json(newForms);
    }

    function updateFormById(req,res){
        var forms = formModel.updateFormById(req.body, req.params.formId);
        if(forms != null){
            res.json(forms);
        }
        else{
            res.json({message: "Cannot update form"});
        }
    }

    function formResponse(form){
        if(form != null){
            res.json(form);
        }
        else{
            res.json({message: "Cannot find form"});
        }
    }

};