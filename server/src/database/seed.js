let User = require('../models/user');
let bcrypt = require('bcrypt');
require('./index');

User.create({
    name: 'Alban Afmeti',
    email: 'albanafmeti@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    is_admin: true,
    token: '44kaj8sj66ttY6s7JQQp92jwn46nc1cc0ikqj2jjde7k211'
}, function (err, user) {
    console.log(err, user);
});