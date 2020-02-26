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
  console.log("Mongo Connected!");
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ //body elements through the URL
  extended: true // Be able to use with Postman
}));


app.get("/", (req, res) => {
  res.send("Happy to use API!");
});

app.get("/book/:id", (req, res) => {
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

app.post('/addBook', (req, res) => {
  Book.create(req.body, (err, data) => {
    if (err) console.log(err);
    else {
      res.send(data);
    }
  });
});

app.put('/updateBook/:id', (req, res) => {
  Book.findOneAndUpdate({
   _id: req.params.id
}, {$set: {name: req.body.name} },
    {upsert: true},
    ((err, data) => {
      if (err) console.log(err);
      else {
        res.send(data);
      }
    })
  );
});

app.delete('/deleteBook/:id', (req, res) => {
  Book.findOneAndDelete({
    _id: req.params.id
  }, (err, data) => {
    if (err) console.log(err);
    else {
      res.send(data);
      res.status(204);
    }
  });
});

app.post("/addBook-2", (req, res) => {
  var newBook = new Book();
  newBook.name = req.body.name;

  newBook.save((err, data) => {
    if(err) console.log(err);
    else{
      res.send(data);
      console.log(data);
    } 
  });

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log("Server is live at :" + PORT);
});
