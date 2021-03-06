// const express = require("express");
import express from "express";
const app = express();
// require('dotenv').config()
import dotenv from "dotenv";
import session from "express-session";
dotenv.config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
// socket.io
const http = require('http');
const socketIo = require("socket.io");


app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: "facebook-clone",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 10 },
    resave: false,
  })
);
require("./config/routes")(app);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: true,
  origins:["localhost:8080"]
});

io.on("connection", (socket) => {
  socket.on('subscribeToTimer', (interval=1000) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  })
});

mongoose
  .connect(
    `mongodb+srv://romesh:${process.env.password}@cluster0.3vyia.mongodb.net/facebook-clone?retryWrites=true&w=majority`,
    { useNewUrlParser: true,useUnifiedTopology: true  },
  )
  .then((res) => {
    console.log("db connected");
  })
  .catch(err => console.log("err :: ", err))

app.listen(8080, function () {
  console.log("Dev app listening on port 8080 !");
});
