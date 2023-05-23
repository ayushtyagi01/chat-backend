const express = require("express");
const app = express();
const http = require('http');
const cors = require('cors');

const {Server} = require('socket.io');

app.use(cors);
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods: ['GET','POST']
    }
})

io.on("connection",(socket)=>{
    console.log(socket.id);

    socket.on('join_room',(room)=>{
        socket.join(room);
        console.log("room",room);
    });
    socket.on('msg_sent',(data)=>{
        console.log("data here",data);
        socket.to(data.room).emit("receive_msg", data);
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected");
    })
})

server.listen(5000,()=>{
    console.log("SERVER RUNNIG");
});