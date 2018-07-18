let mongoose = require('mongoose');
let Helpers = require('../helpers');

let actionSchema = mongoose.Schema({
    type: String,
    content: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dest_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: Date,
    by_admin: Boolean
});

const model = mongoose.model('Action', actionSchema);

module.exports = model;