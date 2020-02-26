const mongoose = require("mongoose");

var BookSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("Book", BookSchema);