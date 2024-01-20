const { Console } = require('console')
const { Socket } = require('dgram')
const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
})


app.use(express.static(__dirname + '/files'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


// socket 

const io = require('socket.io')(http)
const user = {};

io.on('connection' , (socket) =>{
    socket.on('new-user' , name =>{
        console.log('new-user', name)
        user[socket.id]=name;
        socket.broadcast.emit('user-join' , name);
    });
    socket.on('send' ,message => {
        socket.broadcast.emit('receive' ,{message: message , name: user[socket.id]})
    });

    socket.on('leave' ,message => {
        socket.broadcast.emit('leave' , user[socket.id]);
        delete user[socket.id];
    });
})