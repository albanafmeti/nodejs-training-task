let express = require('express');
let User = require('../models/user');
let Helpers = require('../helpers');

var router = express.Router();

router.get('/clients', function (request, response) {

    const auth_token = request.query._token;

    User.getAuthenticatedUser(auth_token, (err, user) => {
        if (err) {
            return Helpers.jsonResponse(response, false, { clients: [] }, 'Something went wrong.');
        }

        if (!user) {
            return Helpers.jsonResponse(response, false, { clients: [] }, 'You are not authorized.');
        }

        // Get list of clients
        User.find({ is_admin: false }, function (err, clients) {

            if (err) {
                return Helpers.jsonResponse(response, false, { clients: [] }, 'Something went wrong.');
            }

            return Helpers.jsonResponse(response, true, { clients: clients }, 'Success.');
        });

    });
});

router.get('/admin', function (request, response) {

    const auth_token = request.query._token;

    User.getAuthenticatedUser(auth_token, (err, user) => {
        if (err) {
            return Helpers.jsonResponse(response, false, { admin: [] }, 'Something went wrong.');
        }

        if (!user) {
            return Helpers.jsonResponse(response, false, { admin: [] }, 'You are not authorized.');
        }

        // Get admin
        User.findOne({ is_admin: true }, function (err, admin) {

            if (err) {
                return Helpers.jsonResponse(response, false, { admin: [] }, 'Something went wrong.');
            }

            return Helpers.jsonResponse(response, true, { admin: admin }, 'Success.');
        });

    });
});

module.exports = router;