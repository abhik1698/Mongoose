const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const http = require("http").Server(app);
const Book = require("./BookSchema");

const db = 'mongodb://localhost/test';
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
const dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'connection error:'));
dbConn.once('open', function() {
  // we're connected
  console.log("Mongo Connected!");
});

app.get("/", (req, res) => {
  res.send("Happy to use API!");
});

app.get("/books/:id", (req, res) => {
  Book.findOne({
    _id: req.params.id
  }).exec((err, data) => {
    if (err)
      res.send(err);
    else  
      res.json(data);
  })
})
app.get("/books", (req, res) => {
  Book.find({}).exec((err, data) => {
    if(err)
      res.send(err);
    else 
      res.send(data);
  });
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log("Server is live at :" + PORT);
});
