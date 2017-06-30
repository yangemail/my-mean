var config = require('./config'), // calling config script

    express = require('express'), // express
    morgan = require('morgan'), // log middleware
    compress = require('compression'), // compress
    bodyParser = require('body-parser'), // data request middleware
    methodOverride = require('method-override'), // supports DELETE and PUT
    session = require('express-session'), // Session

    flash = require('connect-flash'),
    passport = require('passport');

module.exports = function () {
    var app = express();

    // Environment set up
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // User session enable
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    // Set EJS as the default template engine
    // Set VIEW directory, this will search template folder, replaced by template content
    app.set('views', './app/views');
    // Set EJS as the template engine
    app.set('view engine', 'ejs');

    // flash module
    app.use(flash());

    // Passport module
    app.use(passport.initialize());
    app.use(passport.session());

    // Routes
    // Index router
    require('../app/routes/index.server.routes.js')(app);
    // Users router
    require('../app/routes/users.server.routes.js')(app);

    // static contents
    // Need to put under the routers, if routers don't have response, then static contents jump in
    app.use(express.static('./public'));

    return app;
}
