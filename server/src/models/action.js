let mongoose = require('mongoose');
let Helpers = require('../helpers');

let actionSchema = mongoose.Schema({
    type: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    by_admin: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
});

const model = mongoose.model('Action', actionSchema);

module.exports = model;