/**
 * This is an api designed to work with the server.js file to make calls to mongodb.
 * 
 **/
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meanauth', { useMongoClient: true});


// ----------------------- USERS ------------------------
var User = require("../models/user-model.js");

router.get('/', (req, res) => {
    res.send('invalid endpoint');
})
// on routes that end in /userauthentification
router.route('/userauth')

    // create a user (accessed at POST http://localhost:8081/api/userauth)
    .post(function(req, res) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            var user = new User(); // create a new instance of the User model
            user.firstname = req.body.firstname; 
            user.lastname = req.body.lastname;
            user.username = req.body.username;
            user.password = req.body.password;
    
            // save the user and check for errors
            user.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({ message: 'User created!' });
                }
            });
    });
    
    // Register
    router.post('/register', (req, res, next) => {
      let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
      });
    
      User.addUser(newUser, (err, user) => {
        if(err){
          res.json({success: false, msg:'Failed to register user'});
        } else {
          res.json({success: true, msg:'User registered'});
        }
      });
    });
    
    // Authenticate
    router.post('/authenticate', (req, res, next) => {
      res.send('AUTHENTICATE');
    });
    
    // Profile
    router.get('/profile', (req, res, next) => {
      res.send('PROFILE');
    });


// ----------------------- COLLECTIONS ------------------------
var Collection = require("../models/collection-model.js");

// Get collections
/*router.get('/collections', (req, res) => {
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
});*/

module.exports = router;