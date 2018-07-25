function handleSocketEvents(socket) {
    socket.on('disconnect', function () {
        console.log('User disconnected.');
    });
}

module.exports = handleSocketEvents;