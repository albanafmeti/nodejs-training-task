let mongoose = require('mongoose');
let Helpers = require('../helpers');

let userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    token: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    last_action_at: Date,
    last_visit_at: Date,
});

userSchema.methods.generateNewToken = function (callback) {
    let token = Helpers.randomString(40);
    this.token = token;
    return this.update({ token: token }, callback);
};

userSchema.methods.updateLastVisitAt = function (callback) {
    return this.update({ last_visit_at: new Date() }, callback);
};

userSchema.methods.updateLastActionAt = function (callback) {
    return this.update({ last_action_at: new Date() }, callback);
};

userSchema.statics.getAuthenticatedUser = function (token, callback) {
    return this.findOne({ token: token }, callback);
};

const model = mongoose.model('User', userSchema);

module.exports = model;