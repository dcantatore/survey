var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Survey = require('./js/db');
var assert = require('assert');


var app = express();
app.use(bodyParser.json())


app.use('/', express.static(path.join(__dirname, '/')));

app.get('/api', function (req, res) {
    res.send('Ecomm API is running');
});

app.post('/newUser',function(req,res,next){
  Survey.create({
      firstName: req.body.fname,
      lastName: req.body.lname,
      email: req.body.email
  });
    res.sendStatus(201);
});


app.listen(3000, function () {
    console.log('App listening on port 3000!')
})


