var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var uuid = require('node-uuid');
var target = request.body.URL

/*Connects w/MongoDB server*/
MongoClient.connect('mongodb://127.0.0.1:27017/shorten', function(err, db) {
  if (err) {
    throw err;
  }//closes if
})//closes MongoClient.connect

/* GET home page. */
router.get('/', function(request, responds, next) {
  response.render('index', { title: 'Express' });
});

/**/
router.get('/', function(request, response) {
  response.render('index', {});
  // index.jade needs a form to submit a URL for shortening
});

/*Redirects to the page*/
router.post('/', function(request, response) {
  var shortKey = uuid.v4();

  var countClicks = function() {

  var shorten_url = db.collection('shorten_url');
  shorten_url.insert(
    {"_id": _id,
    "shortened": shortKey,
    "target": "https://google.com",
    "clicks": 8,
    "last_click": "2015-01-13T16:42:00"}, function(err, docs) {
    response.redirect('/info/' + shortKey);
  });//closes .insert
});//closes route


router.get('/info/:shortUrl', function(request, response) {

  db.shorten_url.find(
    {"clicks": 1, _id: 0
    });//closes .find

    db.shorten_url.update(
    {$inc {"clicks": 1}
    })//closes .update

  var collection = db.collection('urls'),
      shortUrl = request.params.shortUrl;
  collection.find({'shortened': shortUrl}, function(err, url) {
    response.render('info', {url: url});
  });
});

router.get('/:shortUrl', function(request, response) {
  var collection = db.collection('urls'),
      shortUrl = request.params.shortUrl;
  collection.find({'shortened': shortUrl}, function(err, url) {
    response.redirect(url.target);
  });
});


module.exports = router;





