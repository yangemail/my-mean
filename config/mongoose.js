var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);

    // Add User model
    require('../app/models/user.server.model');

    return db;
}
