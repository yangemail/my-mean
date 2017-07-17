const users = require('../../app/controllers/users.server.controller');

module.exports = function (app) {
    app.route('/users')
        .post(users.create)
        .get(users.list);

    app.route('/users-username-email')
        .get(users.listUsernameEmail);

    app.route('/users-username-email-limited')
        .get(users.listUsernameEmailLimited);

    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.param('userId', users.userByID);
};