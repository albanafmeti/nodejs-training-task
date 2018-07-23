let mongoose = require('mongoose');
let config = require('config');

mongoose.connect(config.db.host, function (err) {
    if (err) {
        console.log('Connection with the database failed.');
    } else {
        console.log('Database has been connected successfully.');
    }
});