const express = require("express");
const http = require("http"); 
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
// const server = http.createServer(app);
// const {Server} = require("socket.io");

// const io = new Server(server,  {
//   pingTimeout: 60000,
//   cors: {
//     origin: "*",
//     path: "/api/arena"
//   },
// });

const scoreRoutes = require("./routes/scores");
const userRoutes = require("./routes/user");
const paraRoutes = require("./routes/paragraph");
const arenaRoutes = require("./routes/arena");


//connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE
  })
.then(()=>{
    console.log("Connected to DB")
})
.catch(error =>{
    console.log(error);
})

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log('request',req.path, req.method);
    req.io = io;
    next();
})

app.use("/api/scores",scoreRoutes);
app.use("/api/user",userRoutes);
app.use("/api/paragraph",paraRoutes);
app.use("/api/arena", arenaRoutes);



const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is UP on PORT ${process.env.PORT}`)
  });

  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
    },
  });



  
  newFunction();


function newFunction() {
  io.on("connection", (socket) => {
    console.log("Sockets are in action " + new Date().getTime());
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      console.log(userData.name, "connected");
      socket.emit("connected");
    });
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User joined room: " + room);
    });
    socket.on("chat", (payload) => {
      console.log("User payload: " + payload);
      io.emit("chat", payload);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
    socket.on("new message", (newMessage) => {
      var chat = newMessage.chatId;
      if (!chat.users)
        return console.log("chat.users not defined");

      chat.users.forEach((user) => {
        if (user._id === newMessage.sender._id)
          return;
        socket.in(user._id).emit("message received", newMessage);
      });
      socket.on("typing", (room) => {
        socket.in(room).emit("typing");
      });
      socket.on("stop typing", (room) => {
        socket.in(room).emit("stop typing");
      });
    });
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });
}
  // app.listen(process.env.PORT || 4000, () => {
  //   console.log('Listening on port: 4000');
  // })