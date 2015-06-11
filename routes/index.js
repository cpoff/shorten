var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');

var MongoClient = require('mongodb').MongoClient;
var longUrl;
var clicks;
var date = new Date()


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
MongoClient.connect('mongodb://127.0.0.1:27017/shorten', function(err, db) {
router.post('/', function(request, response) {
var shortKey = uuid.v4();
var target= request.body.URL
console.log("howdy")

  var collection =  db.collection('shorten_url')
  collection.find(
        {'target': {$eq: target}},
        { target: 1, shortened:1}
        ).toArray(function(err,reply){
          if (reply.length>0){
            console.log(target)
            console.log(reply)
            response.redirect(reply[0].shortened);
          }else{
              collection.insert({
  						"shortened": shortKey,
  						"target": target,
  						"clicks": 0,
  						"last_click": new Date()}, function(err, docs) {
  							collection.find().toArray(function(err, results) {
     						 console.dir(results);
     						
    						response.redirect(shortKey);

                });
              });
          }
        })

});  


router.get('/:shortUrl', function(request, response){
console.log('here')	
  var collection = db.collection('shorten_url')

  // var shortKey = uuid.v4();
  var    shortUrl = request.params.shortUrl;
  console.log(shortUrl)
  // collection.find().toArray(function(err, url) {
    
           
          collection.find(
        {shortened: {$eq: shortUrl}},
        { target: 1, shortened: 1, clicks:1, last_click:1}
        ).toArray(function(err, result){
            
          console.log(result)
    // response.redirect("http://"+result[0].target)
    response.render('post', {"url": result[0]});
          })
      // })
});

router.get('/goto/:shortUrl', function(request, response){
    var collection = db.collection('shorten_url')

  // var shortKey = uuid.v4();
  var    shortUrl = request.params.shortUrl;
  console.log(shortUrl)
  // collection.find().toArray(function(err, url) {
    collection.update(
            {shortened: {$eq: shortUrl}},
            {
              $inc: {clicks: 1},
              $set: {last_click: new Date()}
            }
              )
           
          collection.find(
        {shortened: {$eq: shortUrl}},
        { target: 1, shortened: 1, clicks:1, last_click:1}
        ).toArray(function(err, result){
          response.redirect("http://"+result[0].target)
                  })

})

});



// db.collection.find(
// {shortened:shortKey },
// {
//   target: 1
// }
//   ).limit(1)



module.exports = router;
