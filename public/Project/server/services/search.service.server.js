module.exports = function (app,request){

    app.get("/api/search",fetchAllResult);
    app.get("/api/search/:id",getSearchDetail);

    var apiKey = "7fd3272e638174d575e8ae2c29d0ea71";
    var locuApiKey = "9f1a27ccdfdc6d8dbcf51c6ee8a19e0b7298b368";

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

        var fetch_options = {
            host: 'developers.zomato.com',
            path:'/api/v2.1/search',
            url: "https://developers.zomato.com/api/v2.1/search?lat=42.3742640000&lon=-71.1204150000",
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