/**
 * This is an api designed to work with the server.js file to make calls to mongodb.
 * 
 **/

const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/collections', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// ----------------------- USERS ------------------------
var User = require("../models/user-model.js");

// on routes that end in /userauthentification
router.route('/userauth')

    // create a user (accessed at POST http://localhost:8081/api/userauth)
    .post(function(req, res) {
        connection((db) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            var user = new User(); // create a new instance of the User model
            user.firstname = req.body.firstname; 
            user.lastname = req.body.lastname;
            user.username = req.body.username;
            user.password = req.body.password;
    
            // save the user and check for errors
            user.save(function(err) {
                if (err) {
                    res.send(err);
                }
    
                res.json({ message: 'User created!' });
            });
        });
    });
    
    
router.route('/userauth/:user_id')

    // get the user with that id (accessed at GET http://localhost:8081/api/userauth/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err){
                res.send(err);
            }
            res.json(user);
        });
    });


// ----------------------- COLLECTIONS ------------------------
var Collection = require("../models/collection-model.js");

// Get collections
router.get('/collections', (req, res) => {
    connection((db) => {
        db.collection('collections')
            .find()
            .toArray()
            .then((collections) => {
                response.data = collections;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;

/*
// ----------------------- BASE SETUP ------------------------

// call the packages we need
var express = require('express');  // call express
var app = express();  // define our app using express
var bodyParser = require('body-parser');  // configure app to use bodyParser()

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dolphins', { useMongoClient: true}); // connect to our database

var User = require("./models/model.js");

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8081; // set our port

// ------------------ ROUTES FOR OUR API ---------------------

var router = express.Router();  // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8081/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// on routes that end in /userauthentification
router.route('/userauthentification')

    // create a user (accessed at POST http://localhost:8080/api/userauthentification)
    .post(function(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        var user = new User(); // create a new instance of the Dolphin model
        user.firstname = req.body.firstname; // set the dolphins name (comes from the request)
        user.lastname = req.body.lastname;
        user.username = req.body.username;
        user.password = req.body.password;

        // save the dolphin and check for errors
        user.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'User created!' });
        });

    })
    
    
router.route('/userauthentification/:user_id')

    // get the user with that id (accessed at GET http://localhost:8080/api/userauthentification/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err){
                res.send(err);
            }
            res.json(user);
        });
    })
    
    
    
    
    // update the dolphin with this id (accessed at PUT http://localhost:8080/api/dolphins/:dolphin_id)
    .put(function(req, res) {

        // use our dolphin model to find the dolphin we want
        Dolphin.findById(req.params.dolphin_id, function(err, dolphin) {

            if (err){
                res.send(err);
            }

            dolphin.name = req.body.name;  // update the dolphin's info

            // save the dolphin
            dolphin.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Dolphin updated!' });
            });
        });
    })
        
    // delete the dolphin with this id (accessed at DELETE http://localhost:8080/api/dolphins/:dolphin_id)
    .delete(function(req, res) {
        Dolphin.remove({
            _id: req.params.dolphin_id
        }, function(err, dolphin) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
            
        });
    });

// -------------------------------- REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// ----------------------------- START THE SERVER ------------------------------------

app.listen(port);
console.log('Welcome! Magic happens on port ' + port);
*/