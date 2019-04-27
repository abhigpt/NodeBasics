var express = require('express');
var app     = express();
var port    = process.env.PORT || 8080;
var morgan  = require('morgan');
var mongoose = require('mongoose');
var User     = require('./app/models/user');
console.log("the value of user is",User);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/assignment', {useNewUrlParser: true}, function(err){
  if(err){
    console.log("some error occured in localhost connection");
  }
  else{
    console.log("database connected successfully");
  }
});

app.use(morgan('dev'));
app.get('/home',function(req,res){
  console.log("hello from home");
});
app.post('/users',function(req,res){
  console.log("caoll");
  var user = new User();
  console.log("the value of req body is",req.body);
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  if(!req.body.username || !req.body.password || !req.body.email){
    res.send("One of the fiels is missing");
  }
  else{
    user.save(function(err){
      if(err){
        res.send(err);
      }
      else{
        console.log("the user is created successfully");
        res.send('the user is created successfully');
      }
    });
  }
})
app.get('/', function(req, res){
  res.send('hello world');
});
app.listen(port,function(){
  console.log("the server is running");
})
