"use strict";

var q = require("q");


module.exports = function(db,mongoose) {

    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var ReviewModel = mongoose.model('review',ReviewSchema);

    var RestaurantSchema = require("./restaurant.schema.server.js")(mongoose);
    var RestaurantModel = mongoose.model('hotel',RestaurantSchema);

    var review = {
        addReview:addReview,
        storeHotel:storeHotel,
        getReviewsByResId:getReviewsByResId,
        getReviewsByUserId:getReviewsByUserId
    };

    return review;

    function addReview(review){

        var deferred = q.defer();
        console.log("Inside review Model");
        console.log(JSON.stringify(review));
        var newReview = {
            resId: review.resId,
            userId: review.userId,
            text: review.text,
            userName : review.userName,
            rating : review.rating,
            created: (new Date).getTime(),
            updated: (new Date).getTime()
        };
        ReviewModel.create(newReview, function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                storeHotel(review.hotel);
                deferred.resolve(doc);

            }
        });
        return deferred.promise;
    }

    function getReviewsByResId(resId){
        var deferred = q.defer();
        ReviewModel.find({resId:resId},function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {

                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function getReviewsByUserId(userId){
        var deferred = q.defer();
        ReviewModel.find({userId:userId},function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {

                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function storeHotel(hotel){
        var deferred = q.defer();
        RestaurantModel.create({
            resId: hotel.id,
            name : hotel.name,
            cuisines : hotel.cuisines,
            currency : hotel.currency,
            image : hotel.image

        },function(err,hotel){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(hotel);
            }
        });
        return deferred.promise;
    }
};