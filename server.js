var express = require('express');
var app     = express();
var port    = process.env.PORT || 8080;
var morgan  = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',appRoutes);   // slash api is used to distinguish between frontend and backend routes here

mongoose.connect('mongodb://localhost:27017/assignment', {useNewUrlParser: true}, function(err){
  if(err){
    console.log("some error occured in localhost connection");
  }
  else{
    console.log("database connected successfully");
  }
});

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});
app.listen(port,function(){
  console.log("the server is running");
})
