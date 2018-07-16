let express = require('express');
let bcrypt = require('bcrypt');
let User = require('../models/user');
let Helpers = require('../helpers');

var router = express.Router();

router.post('/auth/check', function (req, res) {

    let data = req.body;

    let user = User.findOne({ 'email': data.email }, function (err, user) {

        if (err) {
            return Helpers.simple_response(res, false, user, 'Something went wrong.');
        }

        if (bcrypt.compareSync(data.password, user.password)) {
            return Helpers.simple_response(res, true, user, 'Credentials match.');
        } else {
            return Helpers.simple_response(res, false, null, 'Credentials do not match.');
        }
    });
});

module.exports = router;