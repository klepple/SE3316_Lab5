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
var Collection = require("../models/collection-model.js");

// Add a new collection
router.post('/collections', (req, res, next) => {
  let newCollection= new Collection({
    name: req.body.name,
    description: req.body.description,
    visibility: req.body.visibility,
    userId: req.body.userId,
    imgArr: req.body.imgArr
  });
    
  Collection.addCollection(newCollection, (err, collection) => {
    if(err){
      res.json({success: false, msg:'Failed to create collection'});
    } else {
      res.json({success: true, msg:'Collection created'});
    }
  });
})

//Get collections for a user
router.get('/collections/:user_id', function(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        Collection.find(function(err, collections) {
            if (err) {
                res.send(err);
            }

            res.json(collections);
        });
    });

router.put('/collections/modify', function(req, res) {
  const name = req.body.name;
  Collection.getCollectionByName(name, (err, collection) => {
    if(err) throw err;
    if(!collection){
      return res.json({success: false, msg: 'Collection not found'});
    }
    collection.imgArr = req.body.imgArr;
    collection.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Collection updated!' });
    });
  });
        
});


module.exports = router;