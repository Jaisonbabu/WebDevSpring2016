module.exports = function(request) {

    var apiKey = "7fd3272e638174d575e8ae2c29d0ea71";

    var search = {
        fetchAllResult: fetchAllResult
    };

    return search;

    function fetchAllResult(){

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


        //function callback(error, response, body) {
        //    if (!error) {
        //        var info = JSON.parse(JSON.stringify(body));
        //        console.log(info);
        //        //console.log(JSON.parse(JSON.stringify(response)));
        //        res = response;
        //    }
        //    else {
        //        console.log('Error happened: '+ error);
        //    }
        //}
        return request(fetch_options).response;

    }
};