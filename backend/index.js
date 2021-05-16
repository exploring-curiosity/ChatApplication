const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{
    console.log("newConnection");
    socket.on('join',({name,room},callback)=>{
        console.log(name,room);
        const error = true;
        if(error)
        callback({error:'error'});
    });
    socket.on('disconnect',()=>{
        console.log('user has left');
    });
});

app.use(router);

server.listen(PORT,()=>{
    console.log('Server started on port: ',PORT);
});