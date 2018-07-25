let User = require('../models/user');
let bcrypt = require('bcrypt');
let Helpers = require('../helpers');

// Start the database connection.
require('./index');

console.log('Seeding...');

User.findOne({ email: 'albanafmeti@gmail.com' }, (err, user) => {
    if (!user) {
        User.create({
            name: 'Alban Afmeti',
            email: 'albanafmeti@gmail.com',
            password: bcrypt.hashSync('123456', 10),
            is_admin: true,
            token: Helpers.randomString(40),
            created_at: new Date(),
            last_visit_at: null,
            last_action_at: null
        }, function (err) {
            if (!err) {
                console.log('User albanafmeti@gmail.com created.');
            }
        });
    } else {
        console.log('User albanafmeti@gmail.com exists.');
    }
});

User.findOne({ email: 'endrimija@gmail.com' }, (err, user) => {
    if (!user) {
        User.create({
            name: 'Endri Mija',
            email: 'endrimija@gmail.com',
            password: bcrypt.hashSync('123456', 10),
            is_admin: false,
            token: Helpers.randomString(40),
            created_at: new Date(),
            last_visit_at: null,
            last_action_at: null
        }, function (err) {
            if (!err) {
                console.log('User endrimija@gmail.com created.');
            }
        });
    } else {
        console.log('User endrimija@gmail.com exists.');
    }
});

User.findOne({ email: 'arbergjoni@gmail.com' }, (err, user) => {
    if (!user) {
        User.create({
            name: 'Arber Gjoni',
            email: 'arbergjoni@gmail.com',
            password: bcrypt.hashSync('123456', 10),
            is_admin: false,
            token: Helpers.randomString(40),
            created_at: new Date(),
            last_visit_at: null,
            last_action_at: null
        }, function (err) {
            if (!err) {
                console.log('User arbergjoni@gmail.com created.');
            }
        });
    } else {
        console.log('User arbergjoni@gmail.com exists.');
    }
});