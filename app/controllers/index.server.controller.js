exports.render = function (req, res) {
    if (req.session.lastVisit) {
        console.log("Last Visit: " + req.session.lastVisit);
    }
    req.session.lastVisit = new Date();

    // 'index' is the ejs template name
    res.render('index', {
        // parameters in the ejs template
        title: 'Hello World',
        userFullName: req.user ? req.user.fullName : ''
    });

    // res.send('Hello World');

    // res.render('index', {
    //     title: 'Hello World',
    //     user: JSON.stringify(req.user)
    // });
};
