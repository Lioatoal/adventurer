const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser'); 

const indexRouter = require('./routes/index');
const systemAPI = require('./routes/systemAPI');
const rfidAPI = require('./routes/rfidAPI');
const gpioAPI = require('./routes/gpioAPI');

const app = express();

/*
 * express module config
*/
// const logFile = fs.createWriteStream('./network.log', {flags: 'a'});
// app.use(logger('dev', {stream: logFile}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Body parser config
 */
app.use(bodyParser.json({
  "type": "application / json",
  "limit": "50mb", 
  "extended": true
}));
app.use(bodyParser.urlencoded({
  "limit": "50mb",
  "extended": false
}));
app.use(bodyParser.raw({ 
  "type": "application/octet-stream", 
  "limit": "50mb", 
  "extended": true
}));
/*
 * Router Define
*/
app.use('/', indexRouter);
app.use('/MTIAPI/SYSTEM', systemAPI);
app.use('/MTIAPI/RFID', rfidAPI);
app.use('/MTIAPI/GPIO', gpioAPI);

/*
 * No favicon.ico temporarily,
*/
app.use( function(req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }
  return next();
});

module.exports = app;
