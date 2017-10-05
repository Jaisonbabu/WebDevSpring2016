module.exports = function (app,request,reviewModel,userModel){

    //Search
    app.get("/api/project/location/search",fetchAllResult);
    app.get("/api/project/search/:id",getSearchDetail);
    app.get("/api/project/query/search",getUserSearchResult);

    //Reviews
    app.get("/api/project/restaurant/review/:id",getReviewsByResId);
    app.get("/api/project/user/review/:id",getReviewsByUserId);
    app.post("/api/project/review",addReview);

    var apiKey = "7fd3272e638174d575e8ae2c29d0ea71";
    var locuApiKey = "9f1a27ccdfdc6d8dbcf51c6ee8a19e0b7298b368";

    function addReview(req,res){
        var review = req.body;
        console.log("Review Web Service ");
        console.log(review);
        reviewModel.addReview(review)
            .then(
                function (createdReview) {
                    console.log("Inside search web service");
                    console.log(JSON.stringify(createdReview));
                    //res.json(createdReview);
                    return createdReview;
                },
                function ( err ) {
                    res.status(400).send(err);
                })
            .then(function(review){
                console.log(review);
                userModel.updateFollower(review.userId)
                .then(function (follower){
                    console.log(" follower updated");
                    res.json(review);
                });


            },function (err){

            })
    }

    function getReviewsByResId(req,res){
        var resId = req.params.id;
        reviewModel.getReviewsByResId(resId)
            .then(
                function (restaurantReviews) {
                    console.log("Inside Review web service");
                    console.log(JSON.stringify(restaurantReviews));
                    res.json(restaurantReviews);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function getReviewsByUserId(req,res){
        var userId = req.params.id;
        reviewModel.getReviewsByUserId(userId)
            .then(
                function (restaurantReviews) {
                    console.log("Inside Review web service");
                    console.log(JSON.stringify(restaurantReviews));
                    res.json(restaurantReviews);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function getSearchDetail(req,res){

        console.log("inside getSearch");
        console.log(req.params.id);

        var fetch_options = {
            host: 'developers.zomato.com',
            path:'/api/v2.1/search',
            url: "https://developers.zomato.com/api/v2.1/restaurant?res_id="+req.params.id,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'user-key':apiKey
            }
        };

        function callback(error, response, body) {
            if (!error) {
                res.send(body)
            }
            else {
                console.log('Error: '+ error);
            }
        }
        request(fetch_options, callback);
    }

    function fetchAllResult(req,res){

        var lat = parseFloat(req.query.lat);
        var lng = parseFloat(req.query.lng);

        var fetch_options = {
            host: 'developers.zomato.com',
            path:'/api/v2.1/search',
            url: "https://developers.zomato.com/api/v2.1/search?lat="+lat+"&lon="+lng+"&sort=real_distance",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'user-key':apiKey
            }
        };

        function callback(error, response, body) {
            if (!error) {
                var info = JSON.parse(JSON.stringify(body));
                console.log(info);
                //console.log(JSON.parse(JSON.stringify(response)));
                res.send(body)
            }
            else {
                console.log('Error happened: '+ error);
            }
        }
        request(fetch_options, callback);

    }

    function getUserSearchResult (req,res){

        var query = req.query.query;
        var lat = parseFloat(req.query.lat);
        var lng = parseFloat(req.query.lng);


        console.log(lng);
        var fetch_options = {
            host: 'developers.zomato.com',
            path:'/api/v2.1/search',
            url: "https://developers.zomato.com/api/v2.1/search?q="+query+"&lat="+lat+"&lon="+lng+"&sort=rating",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'user-key':apiKey
            }
        };

        function callback(error, response, body) {
            if (!error) {
                var info = JSON.parse(JSON.stringify(body));
                console.log(info);
                //console.log(JSON.parse(JSON.stringify(response)));
                res.send(body)
            }
            else {
                console.log('Error happened: '+ error);
            }
        }
        request(fetch_options, callback);
    }

    function getMenu(req,res){

        var data = {
            api_key: locuApiKey,
            "fields" : [ "name", "menus","location" ],
            "venue_queries" : [
                {
                    "name" : "Tremont house of pizza",
                    "location" :  {
                        "geo" : {
                            "$in_lat_lng_radius" : [42.3601, -71.0589, 50000]
                        }
                    }

                }
            ]
        };

        var fetch_options = {
            host: 'api.locu.com',
            path: '/v2/venue/search',
            url: "https://api.locu.com/v2/venue/search",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //'Content-Length': Buffer.byteLength(post_data)
            },
            json: data
        };

        function callback(error, response, body) {
            if (!error) {
                var info = JSON.parse(JSON.stringify(body));
                console.log(info);
                //console.log(JSON.parse(JSON.stringify(response)));
                res.send(body)
            }
            else {
                console.log('Error happened: '+ error);
            }
        }
        request(fetch_options, callback);

    }
};