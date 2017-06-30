// Development configuration options
module.exports = {
    // MongoDB connection string:
    // remote -> mongodb://username:password@hostname:port/database
    // local (username / password are not required) -> mongodb://localhost/database
    db: 'mongodb://localhost/mean-book',

    // Session secret key
    sessionSecret: 'developmentSessionSecret'
}
