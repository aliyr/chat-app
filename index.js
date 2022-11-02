const express = require('express')

const app = express()

const http = require('http')

const server = http.createServer(app)

const { Server: IOServer } = require('socket.io')

const io = new IOServer(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.broadcast.emit('user connected', 'a user connected !!!!');

    socket.on('disconnect', () => {
        console.log('a user disconnected')
        socket.broadcast.emit('user disconnected', 'a user disconnected !!!!');
    })

    socket.on('chat message', (message) => {
        console.log('Chat: ' + message)
        io.emit('chat message', message);
    })

    socket.on('user disconnected', () => {
        console.log('a user disconnected from socket !!!!')
        io.emit('user disconnected', 'a user disconnected !!!!');
    })

    socket.on('user connected', () => {
        io.emit('user connected', 'a user connected !!!!');
    })

})

server.listen(3002, () => {
    console.log('Listening on port 3002')
})