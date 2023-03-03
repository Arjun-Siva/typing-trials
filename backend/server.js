const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const scoreRoutes = require("./routes/scores");
const userRoutes = require("./routes/user");
const paraRoutes = require("./routes/paragraph");

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use("/api/scores",scoreRoutes);
app.use("/api/user",userRoutes);
app.use("/api/paragraph",paraRoutes);

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

app.listen(process.env.PORT, () => {
    console.log("Server running on port",process.env.PORT || 4000);
})