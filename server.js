var express         = require('express');
var bodyParser      = require('body-parser');
var request         = require('request');
var app             = express();
var mongoose        = require ('mongoose');
var multer          = require('multer');
var passport        = require('passport');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');

var localStrategy   = require('passport-local').Strategy;

//var cors            = require('cors');

var connectionString = 'mongodb://127.0.0.1:27017/WebDev2016';

// use remote connection string
// if running in remote server
// if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//         process.env.OPENSHIFT_APP_NAME;
// }

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

//mongodb://<dbuser>:<dbpassword>@ds161194.mlab.com:61194/user
// connect to the database
var db = mongoose.connect(connectionString);

var ipaddress    = '0.0.0.0';
var port         =  process.env.PORT || 3000;

//app.use(cors());
//app.options('*', cors());

app.use(express.static( __dirname + '/public'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use( session ( {
    secret : "secret" ,
    resave : true ,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());



//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies


//console.log("secret");
//console.log(process.env.PASSPORT_SECRET);


console.log("In Server.js");
//require("./public/Project/server/app.js")(app,request,db,mongoose);
require("./public/assignment/server/app.js")(app,request,db,mongoose);


//NOTE: PLease keep this before all http calls
app.listen(port);


app.options('*', function(req, res) {

    res.send(200);

});







