var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');

var MongoClient = require('mongodb').MongoClient;
var longUrl;
var clicks;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
MongoClient.connect('mongodb://127.0.0.1:27017/shorten', function(err, db) {
router.post('/', function(request, response) {
var shortKey = uuid.v4();
var target= request.body.URL
console.log("howdy")

  var shorten_url =  db.collection('shorten_url')
  shorten_url.insert({
  						"shortened": shortKey,
  						"target": target,
  						"clicks": 8,
  						"last_click": "2015-01-13T16:42:00"}, function(err, docs) {
  							shorten_url.find().toArray(function(err, results) {
     						 console.dir(results);
     						
    						response.redirect('/post/' + shortKey);
  });
});


});  


router.get('/post/:shortUrl', function(request, response){
console.log('here')	// MongoClient.connect('mongodb://127.0.0.1:27017/shorten', function(err, db) {
  var collection = db.collection('shorten_url')
  var    shortUrl = request.params.shortKey;
  collection.find({}).toArray(function(err, url) {
  	console.log(err)
  	console.log(url)
    response.render('post', {"url": url});
  })
});
});


module.exports = router;
