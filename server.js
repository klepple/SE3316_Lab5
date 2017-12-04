//server.js

/**
 * This is a server used to connect to the mongo database. An api has been defined in ./server/routes/api.js
 * 
 *
  **/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const passport = require('passport');

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// API location
app.use('/api', api);

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/lab5/src/index.html'));
});

//Set Port
const port = '8081';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));