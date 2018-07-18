let express = require('express');
let bcrypt = require('bcrypt');
let User = require('../models/user');
let Helpers = require('../helpers');

var router = express.Router();

router.post('/check', function (request, response) {

    const data = request.body;

    // Validate Email
    if (!Helpers.validateRequired(data.email)) {
        return Helpers.jsonResponse(response, false, null, 'Email is required.');
    }

    // Validate Password
    if (!Helpers.validateRequired(data.password)) {
        return Helpers.jsonResponse(response, false, null, 'Password is required.');
    }

    // Find User
    User.findOne({ 'email': data.email }, function (err, user) {

        if (err) {
            return Helpers.jsonResponse(response, false, user, 'Something went wrong.');
        }

        // Check if exist and compare password
        if (user && bcrypt.compareSync(data.password, user.password)) {
            user.generateNewToken((err, result) => {
                if (result.ok) {
                    return Helpers.jsonResponse(response, true, { user: user }, 'Credentials match.');
                }
                return Helpers.jsonResponse(response, false, user, 'Something went wrong.');
            });
        } else {
            return Helpers.jsonResponse(response, false, null, 'Credentials do not match.');
        }
    });
});

module.exports = router;