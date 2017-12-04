/**
 * This is an api designed to work with the server.js file to make calls to mongodb.
 * 
 **/
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const passport = require('passport');


// Connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meanauth', { useMongoClient: true});

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

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

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
    
    
/*router.route('/userauth/:user_id')

    // get the user with that id (accessed at GET http://localhost:8081/api/userauth/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err){
                res.send(err);
            }
            res.json(user);
        });
    });*/
    
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
      const username = req.body.username;
      const password = req.body.password;
    
      User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
          return res.json({success: false, msg: 'User not found'});
        }
    
        User.comparePassword(password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch){
            const token = jwt.sign({data:user}, config.secret, {
              expiresIn: 604800 // 1 week
            });
    
            res.json({
              success: true,
              token: 'JWT '+token,
              user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username
              }
            });
          } else {
            return res.json({success: false, msg: 'Wrong password'});
          }
        });
      });
    });
    
    // Profile
    router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
      res.json({user: req.user});
    });


// ----------------------- COLLECTIONS ------------------------
/*var Collection = require("../models/collection-model.js");

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
*/
module.exports = router;