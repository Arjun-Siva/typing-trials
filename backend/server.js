const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const scoreRoutes = require("./routes/scores");
const userRoutes = require("./routes/user");
const paraRoutes = require("./routes/paragraph");
const arenaRoutes = require("./routes/arena");
const { ArenaSockets } = require("./socketMethods");


//connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE
})
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(error => {
        console.log(error);
    })

//middleware
app.use(express.json());

app.use(cors({ origin: true }));

app.use((req, res, next) => {
    console.log('request', req.path, req.method);
    next();
});

app.use("/api/scores", scoreRoutes);
app.use("/api/user", userRoutes);
app.use("/api/paragraph", paraRoutes);
app.use("/api/arena", arenaRoutes);



const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is UP on PORT ${process.env.PORT}`)
});

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

ArenaSockets(io);
