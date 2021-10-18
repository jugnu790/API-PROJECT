const mongoose = require("mongoose");

// creat book schema
const BookSchema = mongoose.Schema(
  {
    ISBN:String,
    title: String,
    pubDate: String,
    language: String,
    numPage: Number,
    author: [Number],
    publication: [Number],
    Category: [String]
  }
);

const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;
