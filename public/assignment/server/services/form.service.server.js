module.exports = function (app, formModel){

    app.get("/api/assignment/user/:userId/form", findFormByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);


    function findFormByUserId(req,res){
        console.log("Inside webservice");
        formModel.findFormByUserId(req.params.userId)
            .then(function(forms){
                    res.json(forms);
                },
                function(err){
                    res.status(400).send(err);
                });

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
        formModel.createForm(req.body, req.params.userId)
            .then( function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req,res){
        formModel.updateFormById(req.body, req.params.formId)
        .then(function (updatedForm){
                res.json(updatedForm);
            },
            function(err){
                res.status(400).send(err);
            }
        );
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