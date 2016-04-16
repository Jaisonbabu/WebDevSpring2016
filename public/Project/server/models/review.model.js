"use strict";

var q = require("q");


module.exports = function(db,mongoose) {

    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var ReviewModel = mongoose.model('review',ReviewSchema);

    var review = {
        addReview:addReview
    };

    return review;

    function addReview(review){

        var deferred = q.defer();
        console.log("Inside review Model");
        console.log(JSON.stringify(review));
        ReviewModel.create(review, function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise
    }
};