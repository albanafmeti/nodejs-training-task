let mongoose = require('mongoose');

let userShema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    is_admin: Boolean,
    token: String
});

const model = mongoose.model('User', userShema);

module.exports = model;