module.exports = function (app, formModel){

    app.get("/api/assignment/user/:userId/form", findFormByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);


    function findFormByUserId(req,res){
        var forms = formModel.findFormByUserId(req.params.userId);
        console.log(forms);
        res.json(forms);
    }

    function findFormById(req,res){
        var form = formModel.findFormById(req.params.formId);
        res.json(form)
    }

    function deleteFormById(req,res){
        var forms = formModel.deleteFormById(req.params.formId);
        res.json(forms);
    }

    function createForm(req,res){
        console.log(req.body);
        var newForms = formModel.createForm(req.body, req.params.userId);
        res.json(newForms);
    }

    function updateFormById(req,res){
        var forms = formModel.updateFormById(req.body, req.params.formId);
        res.json(forms);
    }

    //function formResponse(form){
    //    if(form != null){
    //        res.json(form);
    //    }
    //    else{
    //        res.json({message: "Cannot find form"});
    //    }
    //}

};