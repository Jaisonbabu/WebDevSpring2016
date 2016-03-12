var express = require('express');
var http = require('http');
//var cors = require('cors');
var app = express();
//app.use(cors());
//app.options('*', cors());
var bodyParser = require('body-parser');

app.use(express.static( __dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//NOTE: PLease keep this before all http calls
app.listen(port, ipaddress);
//app.all('*', function(req, res, next) {
//    res.setHeader("Access-Control-Allow-Origin", "*");
//    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//    res.setHeader("Access-Control-Max-Age", "3600");
//    res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
//
//
//    if ('OPTIONS' == req.method) {
//        res.send(200);
//    }
//    else {
//        next();
//    }
//});
//
//    var responseSettings = {
//        "AccessControlAllowOrigin": req.headers.origin,
//        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
//        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
//        "AccessControlAllowCredentials": true
//    };
//
//    /**
//     * Headers
//     */
//    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
//    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
//    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
//    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
//
//    if ('OPTIONS' == req.method) {
//        res.send(200);
//    }
//    else {
//        next();
//    }
//
//
//});
//
//var allowCrossDomain = function(req, res, next) {
//    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//    if ('OPTIONS' === req.method) {
//        res.send(200);
//    } else {
//        next();
//    }
//};
//var url = "https://api.locu.com/v2/venue/search/";
//app.post(url,function(req,res){
//    res.json(req);
//});


//app.use(allowCrossDomain);


//var post_req = http.request(post_options, function(res) {
//    res.setEncoding('utf8');
//    res.on('data', function (chunk) {
//        console.log('Response: uest(req, function(res){
    //    console.log(re' + chunk);
//    });
//});


    app.post('/Project', function(req,res){
        console.log("Inside Server");

        var post_options = {
            host: 'api.locu.com',
            path:'/v2/venue/search',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                //'Content-Length': Buffer.byteLength(post_data)
            }

        };
        var post_req= http.request(post_options,function(res){
           console.log("Success");
            console.log(res);
        });
        var data = {
            api_key : "9f1a27ccdfdc6d8dbcf51c6ee8a19e0b7298b368",
            fields : [ "name", "location", "contact" ],
            venue_queries : [
                {
                    name : req.body.venue
                }
            ]
        };
        post_req.write(JSON.stringify(data));
        post_req.end();
        res.send();
    //});
    //});

});






