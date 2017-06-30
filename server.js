process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

// Mongoose must be first priority, in order to load first
var db = mongoose();
var app = express();
var passport = passport();
app.listen(3000);

module.exports = app;

console.log('Server running at http://localhost:3000/');