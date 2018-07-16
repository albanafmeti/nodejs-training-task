let express = require('express');
let cors = require('cors');
let router = require('./routes');

let app = express();
let parser = require('body-parser');

require('./database');

app.use('/', express.static('public'));
app.use(cors());
app.use(parser.json());

app.use('/api', router);

app.listen(3000, function () {
    console.log("The server is running on port 3000.");
});
