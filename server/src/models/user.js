let mongoose = require('mongoose');
let Helpers = require('../helpers');

let userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    is_admin: Boolean,
    token: String,
    created_at: Date,
    last_action_at: Date,
    last_visit_at: Date,
});

userSchema.methods.generateNewToken = function (cb) {
    let token = Helpers.randomString(30);
    this.token = token;
    return this.update({ token: token }, cb);
};

userSchema.statics.getAuthenticatedUser = function (token, cb) {
    return this.findOne({ token: token }, cb);
};

const model = mongoose.model('User', userSchema);

module.exports = model;