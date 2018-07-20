let express = require('express');
let Action = require('../models/action');
let User = require('../models/user');
let Helpers = require('../helpers');

var router = express.Router();

router.get('/', function (request, response) {

    const auth_token = request.query._token;

    User.getAuthenticatedUser(auth_token, (err, user) => {
        if (err) {
            return Helpers.jsonResponse(response, false, { actions: [] }, 'Something went wrong.');
        }

        if (!user) {
            return Helpers.jsonResponse(response, false, { actions: [] }, 'You are not authorized.');
        }


        let condition = {};
        if (!user.is_admin) {
            condition = { $or: [{ 'user_id': user._id }, { 'dest_user_id': user._id }] };
        }

        Action.find(condition).populate('user_id').exec(function (err, actions) {

            if (err) {
                return Helpers.jsonResponse(response, false, { actions: [] }, 'Something went wrong.');
            }

            return Helpers.jsonResponse(response, true, { actions: actions }, 'Success.');
        });

    });
});

module.exports = router;