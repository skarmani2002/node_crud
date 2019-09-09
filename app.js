'use strict';
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

//requiring global module so they will be available all-across the application
global.errors = require('./errors/response-errors');

const app = express();
const UserController = require('./controllers/UserController');
const user_controller = new UserController();
app.use(express.static(path.join(__dirname, 'public')));


//request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:'50mb', extended: false}));

// Use the logger
app.use(logger('dev'));

//base route
app.get('/', (req, res) => {
    res.json({
        success: true,
        env: process.env.NODE_ENV || '',
        server: 'Node Running'
    });
});



//loding routes
fs.readdirSync('./routes').forEach((file) => {
    if (file.split('.').pop() === 'js') {
        //console.log('adding route file: %s', file);
        app.use( require('./routes/' + file));
    }
});



// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(errors.getError('ESS40401'));
});

//catch any other expection or error response
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const errorStructure = {
        status: err.status || 500,
        error_code: err.error_code || `ESS50001`,
        error_summary: err.error_summary || `Internal Server Error`,
        error_message: err.error_message || err.message
    };
    if ({}.hasOwnProperty.call(err, 'source') === true) {
        errorStructure.source = err.source;
    }
    
    res.json(errorStructure);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason)

  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})


module.exports = app;

