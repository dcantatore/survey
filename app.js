var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Survey = require('./js/db');
var assert = require('assert');


var app = express();
app.use(bodyParser.json())


app.use('/', express.static(path.join(__dirname, '/')));

app.post('/newUser',function(req,res,next){
  Survey.find({email: req.body.email}).count().exec(function (err,results){
      if (err){
          console.log(err);
      }
      //check if email exists
      if (results > 0){
          res.send("user exists");
      }
      else {
          Survey.create({
              firstName: req.body.fname,
              lastName: req.body.lname,
              email: req.body.email,
              ipInfo: req.body.ipInfo
          });
          res.sendStatus(201);
      }
  });
});


app.listen(3000, function () {
    console.log('App listening on port 3000!')
})


