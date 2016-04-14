var express         = require('express');
var bodyParser      = require('body-parser');
var request         = require('request');
var app             = express();
var mongoose        = require ('mongoose');
//var multer          = require('multer');
//var passport        = require('passport');
//var localStrategy   = require('passport-local').Strategy;
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
//var cors            = require('cors');

var connectionString = 'mongodb://127.0.0.1:27017/WebDev2016';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

var ipaddress    = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port         = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.use(cors());
//app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "secret", resave: true,
    saveUninitialized: true}));
//app.use(multer());
app.use(cookieParser());
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static( __dirname + '/public'));

//console.log("secret");
//console.log(process.env.PASSPORT_SECRET);


console.log("In Server.js");
require("./public/Project/server/app.js")(app,request,db,mongoose);
require("./public/assignment/server/app.js")(app,db,mongoose);


//NOTE: PLease keep this before all http calls
app.listen(port, ipaddress);


app.options('*', function(req, res) {

    res.send(200);

});







