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
    socket.emit('user connected', 'user connected !!!')
    socket.on('disconnect', () => {
        console.log('a user disconnected')
        socket.emit('user disconnected', 'user disconnected !!!')
    })

    socket.on('chat message', (message) => {
        console.log('Chat: ' + message)
        io.emit('chat message', message);
    })

})

server.listen(3000, () => {
    console.log('Listening on port 3000')
})