let User = require('../models/user');
let bcrypt = require('bcrypt');
require('./index');

User.create({
    name: 'Alban Afmeti',
    email: 'albanafmeti@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    is_admin: true,
    token: '44kaj8sj66ttY6s7JQQp92jwn46nc1cc0ikqj2jjde7k211',
    created_at: new Date(),
    last_visit_at: null,
    last_action_at: null
}, function (err) {
    if (!err) {
        console.log('User albanafmeti@gmail.com created.');
    }
});

User.create({
    name: 'Endri Mija',
    email: 'endrimija@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    is_admin: false,
    token: '44kaj8sj66ttY6s7JQQp92jwn46nc1cc0ikqj2jjde7k222',
    created_at: new Date(),
    last_visit_at: null,
    last_action_at: null
}, function (err) {
    if (!err) {
        console.log('User endrimija@gmail.com created.');
    }
});

User.create({
    name: 'Arber Gjoni',
    email: 'arbergjoni@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    is_admin: false,
    token: '44kaj8sj66ttY6s7JQQp92jwn46nc1cc0ikqj2jjde7k233',
    created_at: new Date(),
    last_visit_at: null,
    last_action_at: null
}, function (err) {
    if (!err) {
        console.log('User arbergjoni@gmail.com created.');
    }
});