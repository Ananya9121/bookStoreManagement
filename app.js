require('dotenv').config();
const express = require('express'); // import express module

const Routes = require('./routes/index');
const mongoose = require("mongoose"); //import mongoose module

const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1/bookStrore')
mongoose.connection.on('connected', () => {
  console.log('Database Connected');
});
mongoose.connection.on('disconnected', () => {
  console.log('disconnected to database');
});

//event to catch error in the database connection
mongoose.connection.on('error', (err) => {
  console.log('error in database connection', err);
});

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({
  extended: true
}));

// cors handling here
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, x-csrf-token, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, PATCH, GET, POST, DELETE");
    return res.status(200).json({});
  }
  next();
});


//all routes here
app.use(Routes);

app.use(function (req, res, next) {
  res.status(404).send({ message: "No Matching Route Please Check Again...!!" });
  return
});
// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    Error: {
      message: err.message
    }
  });
});

module.exports = app;