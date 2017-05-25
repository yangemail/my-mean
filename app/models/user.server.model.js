var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User']
    },
    email: {
        type: String,
        index: true,
        match: /.+\@.+\..+/
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        // Customized validator
        validate: [
            function (password) {
                return password.length >= 6;
            },
            'Password should be longer'
        ]
    },
    website: {
        type: String,
        set: function (url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }
                return url;
            }
        }
    },
    website2: {
        type: String,
        get: function (url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }
                return url;
            }
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// pre: init, validate, save, remove
UserSchema.pre('save', function (next) {
    if (1) {
        next();
    } else {
        next(new Error('An Error Occured.'));
    }
});

// post:
UserSchema.post('save', function (next) {
    if(this.isNew) {
        console.log('A new user was created.');
    } else {
        console.log('A user updated is details.');
    }
})

// Virtual value (Important)
UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

// Enable getter (default value is disabled)
UserSchema.set('toJSON', {
    getters: true,
    virtual: true
});

// New customized static methods
UserSchema.statics.findOneByUsername = function (username, callback) {
    this.findOne({username: new RegExp(username, 'i')}, callback);
}

// New customized method methods
UserSchema.methods.authenticate = function (password) {
    return this.password === password;
}

mongoose.model('User', UserSchema);
