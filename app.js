var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dbs = require('./js/db');
var assert = require('assert');


var app = express();
app.use(bodyParser.json());


app.use('/', express.static(path.join(__dirname, '/')));

// setup to get surveys based on path input from db
app.get('/:surveyName', function(req,res,next){
    var surveryName = req.params.surveyName;
    console.log(surveryName);
    dbs.surveys.find({name:surveryName}).exec(function (err, surveyData) {
        console.log(surveyData);

    });
    res.sendFile(path.join(__dirname, '/'));

});


app.post('/newUser',function(req,res,next){
  dbs.results.find({email: req.body.email}).count().exec(function (err,findRes){

      if (err){
          console.log(err);
      }
      //check if email exists
      if (findRes > 0){
          res.send("user exists");
      }
      else {
          dbs.results.create({
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


