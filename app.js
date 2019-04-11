var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({
  extended: true
}));
var empty = require('is-empty');

//app.use(express.bodyParser());
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("Quiz");

  app.post('/validate', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    var email = req.body.email;
    var mob = req.body.mob;
    var myobj = {
      $or: [{
        email: email
      }, {
        mob: mob
      }]
    };

    console.log("Email:" + email);



    try{
      dbo.collection("User").find(myobj).toArray(function (err, result) {

        if (empty(result)) //if it does
        {
          console.log("empty")
          res.end("empty");
        } else {
          console.log("Not")
          res.end("Not");
        }
        if (err) throw err;
      });
  }
  catch(e){
    res.end("Not");
  }
   

     
  });
  app.post('/signup', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var mob = req.body.mob;

    var myobj = {
      id: email,
      name: name,
      password: password,
      mob: mob
    };

    console.log("Email:" + email);


    dbo.collection("User").insertOne(myobj, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.end("Done");
    });
  });
  app.post('/login', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    var email = req.body.email;
    var password = req.body.password;
    var myobj = {
      $and: [{
        id: email
      }, {
        password: password
      }]
    };



    try{
      dbo.collection("User").findOne(myobj,function (err, result) {
        if (empty(result)) //if it does
        {
          res.end("False");
        } else {
          if(result.type == "admin")
          {
            res.end("Admin");
          }
          else{
            res.end("True" );
          }
        }
  
        if (err) throw err;
      });
    }
    catch(e){
      res.end("False");
    }

   
});

app.post('/Quiz', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  var query = req.body.Quiz;

  console.log("query:" + query);


  dbo.collection("Quiz").insertOne(query, function (err, result) {
    if (err) throw err;
    console.log("Done")
    res.end("Done");
  });
});
app.post('/home', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");


  dbo.collection("Quiz").find({},{name:1}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});
// app.post('/Quiz', function (req, res) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//   var query = req.body.Quiz;

//   console.log("query:" + query);


//   dbo.collection("Quiz").insertOne(query, function (err, result) {
//     if (err) throw err;
//     console.log("Done")
//     res.end("Done");
//   });
// });
app.post('/question', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  var quizname = req.body.quizname
  try{
    dbo.collection("Quiz").findOne({name:quizname},function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  }catch(e){
    res.send(e);
  }
  
});
});




app.listen(8080, function () {
  console.log('Server running at http://127.0.0.1:8080/');
});