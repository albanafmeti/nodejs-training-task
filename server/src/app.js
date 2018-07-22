let express = require('express');
let cors = require('cors');

let app = express();
let parser = require('body-parser');

require('./database');

app.use('/', express.static('public'));
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

let http = require('http').Server(app);
let io = require('socket.io')(http);
let handleSocketEvents = require('./socket');

io.on('connection', function (socket) {
    console.log('New socket connection.');

    let router = require('./routes')(socket);
    app.use('/api', router);

    handleSocketEvents(socket);
});

http.listen(3000, function () {
    console.log("The server is running on port 3000.");
});
