var User = require('mongoose').model('User');

exports.create = function (req, res, next) {
    var user = new User(req.body);

    user.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    })
};

// Demo purpose only
exports.findUsernameAndPassword = function (req, res, next) {
    User.find({},
        'username email',
        {
            skip: 10,
            limit: 10
        },
        function (err, users) {
            if (err) {
                return next(err);
            } else {
                return res.json(users);
            }
        })
};

// Demo findOneByUserName (statics method in User Model)
exports.findOneByUsername = function (req, res, next) {
    User.findOneByUsername('username', function (err, user) {
        //...
    })
};

// Demo -> user.authenticate('password')

exports.read = function (req, res) {
    res.json(req.user);
};

exports.userByID = function (req, res, next, id) {
    User.findOne({
        _id: id
    }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.update = function (req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    })
};

exports.delete = function (req, res, next) {
    req.user.remove(function (err) {
        if(err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    })
}
