var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String
        //index: true
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: String,
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
