var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var shortUrl = uuid.v4();
var MongoClient = require('mongodb').MongoClient;
var longUrl;
var clicks;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(request, response) {
var target= request.body.URL
console.log("howdy")
MongoClient.connect('mongodb://127.0.0.1:27017/shorten', function(err, db) {
  var shorten_url =  db.collection('shorten_url')
  shorten_url.insert({
  						"shortened": shortUrl,
  						"target": target,
  						"clicks": 8,
  						"last_click": "2015-01-13T16:42:00"}, function(err, docs) {
  							shorten_url.find().toArray(function(err, results) {
     						 console.dir(results);
     						 db.close();
    						response.redirect('/post/' + shortUrl);
  });
});


});  
});


module.exports = router;
