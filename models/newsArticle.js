const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsArticleSchema = new Schema ({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300, 
  },
  imageUrl: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 300,
  },
  details: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3000,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
})

const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

exports.NewsArticle = NewsArticle 