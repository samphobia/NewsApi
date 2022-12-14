const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsArticleSchema = new Schema ({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3000, 
  },
  imageUrl: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3000,
  },
  details: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300000,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  // _id: {
  //   type: String
  // },
})

const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

exports.NewsArticle = NewsArticle 