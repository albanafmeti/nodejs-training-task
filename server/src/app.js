let express = require('express');
let cors = require('cors');

let app = express();
let bodyParser = require('body-parser');

// Start database connection.
require('./database');

// Serve static files.
app.use('/', express.static('public'));

// Enable CORS.
app.use(cors());

// Parse request body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

let http = require('http').Server(app);
let io = require('socket.io')(http);

// Socket.io connection.
io.on('connection', function (socket) {
    console.log('New socket connection.');

    let router = require('./routes')(socket);
    app.use('/api', router);

    require('./socket')(socket);
});

http.listen(3000, function () {
    console.log("The server is running on port 3000.");
});
