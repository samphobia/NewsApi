const {NewsArticle} = require("../models/newsArticle");

exports.postAddNewsArticle = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const details = req.body.details;
  const date = req.body.date;
  const newsArticle = new NewsArticle({
    title: title,
    details: details,
    date: date,
    imageUrl: imageUrl
  });
  newsArticle
    .save()
    .then(result => {
      // console.log(result);
      res.status(200).json({
        status: "Success",
        message: "Article created"
      });
      // res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
      res.status(402).json({
        status: "Failed",
        message: "could not create article"
      })
    });
};

exports.getNewsArticle = (req, res, next) => {
  NewsArticle.find()
  .then(newsArticles => {
    res.status(200).json({
      news: newsArticles,
      status: "Success",
      message: "Resource loaded successfully"
    })
  })
  .catch(err => {
    res.status(200).json({
      status: "Failed",
      message: "Resource loaded failed"
    })
  })
};

exports.getOneNewsArticle = (req, res, next) => {
  const {articleId} = req.params.newsArticleId;
  if ( articleId == ''){
    res.status(400).json({
      status: "Failed",
      message: "please enter articleID"
    }) 
  } else {
    NewsArticle.findByID(articleId)
    .then(newsArticle => {
    res.status(200).json({
      oneArticle: newsArticle
    })
  })
  .catch(err => {
    res.status(402).json({
      status: "Failed loading article",
      message: "Resource not found"
    })
  })
  }
}