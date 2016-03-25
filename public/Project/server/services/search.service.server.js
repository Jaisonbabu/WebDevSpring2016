module.exports = function (app, searchModel,request){
    app.get("/api/search",fetchAllResult);

    var apiKey = "7fd3272e638174d575e8ae2c29d0ea71";
    function fetchAllResult(req,res){
        //var results = searchModel.fetchAllResult();
        //
        //console.log("Result :"+JSON.stringify(results));
        //res.send(results);

        var fetch_options = {
            host: 'developers.zomato.com',
            path:'/api/v2.1/search',
            url: "https://developers.zomato.com/api/v2.1/search?lat=42.3742640000&lon=-71.1204150000",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'user-key':apiKey
                //'Content-Length': Buffer.byteLength(post_data)
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
};