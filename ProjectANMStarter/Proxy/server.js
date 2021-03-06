
var express = require('express'); 
var request = require('request'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var app = express();
const db = require('./db.js')
const Content = require('./db.js').Content;
app.use(express.static(__dirname + '/'));


app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
//Comments config
const Comment = require('./db.js').Comment; //require the schema in database
var query = "";
app.get('/comments',  (req, res) => {
  // res.send('Helo World from server 3');
  console.log(query, "QUEEERRRYYY")
  Comment.find({idContent: query._id})
    .sort({ date: -1 })
    .then(comments => {res.json(comments)
    console.log("Commentttttssss", comments)})
    // .catch(err => console.log(err))

});


// app.post('/shares', function (req, res) {
//   console.log("sucees post increaments shares")
//   const id = req.body.user_id;
//   // db.Content.update(  { _id:id} , { $set: { 'shares' : shares + 1  } } );

//  db.Content.update(
//     {_id: id},
//     {$inc: {"shares": 1}}
//   );
// }
// )


app.post('/comments', (req, res) => {
  console.log(query, "THIS WHAT WE NEED")

  const newComment = Comment({
    idContent: query,
    username:req.body.username,
    text: req.body.text,
    likes: req.body.likes,
    date: req.body.date
  }) 
  
  newComment.save()
    .then(comment => res.json(comment))
    .catch(err => console.log(err))
})

//Content config

app.get('/content', function (req, res) {
  console.log(req.query, "reeeeeqqqqq");
  query = req.query;
  var n = req.query._id;
  console.log("get data from server");
  Content.findOne({_id: n}).exec((err,content) => { 
      if(err){
        console.log(err);
        //req.send();
      }
      res.json(content)});
});

app.get('/story', function (req, res) {
  db.Content
        .find({})
        .limit(5)
        //.sort({shares: -1})
        .exec((err,data) => { 
      if(err){
        console.log(err);
        req.send()
      }
      res.json(data);
    })  
});

  app.listen(process.env.PORT || 7000); 
console.log('Server running on port %d', 7000);

