let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-task', function (err) {
    if (err) {
        console.log('Connection with the database failed.');
    } else {
        console.log('Database has been connected successfully.');
    }
});