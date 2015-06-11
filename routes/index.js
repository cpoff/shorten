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
    var date = ISODate();

    var collection =  db.collection('shorten_url')
    collection.find(
      {'target': {$eq: target}},
      { target: 1, shortened:1}
      ).toArray(function(err,reply){
        if (reply.length>0){
          console.log(target)
          console.log(reply)
          response.redirect(reply[0].shortened);
        } else {
          collection.insert({
            "shortened": shortKey,
            "target": target,
            "clicks": 0,
            "last_click": date}, function(err, docs) {
            collection.find().toArray(function(err, results) {
              console.dir(results);
              response.redirect(shortKey);
            });// closes collection.find function
            }// closes function
          );// closes collection.insert
        }// closes else
    })// closes toArray
  });// closes router.post  


  router.get('/:shortUrl', function(request, response){
    console.log('here')
    var collection = db.collection('shorten_url')
    var shortUrl = request.params.shortUrl;
    
    collection.update(
      {shortened: {$eq: shortUrl}},
      {$inc: {clicks: 1}}
    )//closes collection.update
    
    collection.find(
      {shortened: {$eq: shortUrl}},
      {target:1, shortened:1, clicks:1, last_click:1}
    )//closes collection.find
    .toArray(function(err, result){
      console.log(result)
      response.render('post', {"url": result[0]});
   }) // closes .toArray
  });// closes router.get

  router.get('/goto/:shortUrl', fucntion (request, respond) {

  })// closes router.get
});//closes MongoClient


module.exports = router;