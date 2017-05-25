var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        // index: true,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    // role: {
    //     type: String,
    //     enum: ['Admin', 'Owner', 'User']
    // },
    username: {
        type: String,
        unique: true,
        // required: true
        required: 'Username is required',
        trim: true
    },
    password: {
        type: String,
        // Customized validator
        validate: [
            function (password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ]
    },
    salt: { // hash to password
        type: String
    },
    provider: { // password type
        type: String,
        required: 'Provider is required'
    },
    providerId: String, // identify for user identification
    providerData: {}, // save for OAuth information
    // website: {
    //     type: String,
    //     set: function (url) {
    //         if (!url) {
    //             return url;
    //         } else {
    //             if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
    //                 url = 'http://' + url;
    //             }
    //             return url;
    //         }
    //     }
    // },
    // website2: {
    //     type: String,
    //     get: function (url) {
    //         if (!url) {
    //             return url;
    //         } else {
    //             if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
    //                 url = 'http://' + url;
    //             }
    //             return url;
    //         }
    //     }
    // },
    created: {
        type: Date,
        default: Date.now
    }
});

// Virtual value (Important)
UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

// pre: init, validate, save, remove
UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

// post:
UserSchema.post('save', function (next) {
    if (this.isNew) {
        console.log('A new user was created.');
    } else {
        console.log('A user updated is details.');
    }
});

UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64)
        .toString('base64');
};

UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

// New customized static methods
// UserSchema.statics.findOneByUsername = function (username, callback) {
//     this.findOne({username: new RegExp(username, 'i')}, callback);
// }

UserSchema.static.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

// Enable getter (default value is disabled)
UserSchema.set('toJSON', {
    getters: true,
    virtual: true
});

mongoose.model('User', UserSchema);
