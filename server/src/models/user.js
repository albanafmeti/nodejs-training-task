let mongoose = require('mongoose');
let Helpers = require('../helpers');

let userShema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    is_admin: Boolean,
    token: String
});

userShema.methods.generateNewToken = function (cb) {
    let token = Helpers.randomString(15);
    this.token = token;
    return this.update({ token: token }, cb);
};

const model = mongoose.model('User', userShema);

module.exports = model;