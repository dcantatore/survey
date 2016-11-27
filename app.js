var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dbs = require('./js/db');
var assert = require('assert');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());


/*var data = fs.readFileSync('index.html').toString().split("\n");
data.splice(10, 0, "<script></script>");
var text = data.join("\n");

fs.writeFile('tempIndex/file.txt', text, function (err) {
    if (err) return console.log(err);
});*/


// setup to get surveys based on path input from db
app.get('/getSurveyInfo/:surveyName', function(req,res,next){
    var surveyName = req.params.surveyName;
    console.log(surveyName +  " initial");
    dbs.surveys.find({name:surveyName}).exec(function (err, surveyData) {
        console.log(surveyData +  " in find");
        fs.writeFile('surveyData/' + surveyName +".js", surveyData, function(err){
            if (err) return console.log(err);
        });


    });
});

app.use('/', express.static(path.join(__dirname, '/')));


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
              ipInfo: req.body.ipInfo,
              userAgentInfo: req.body.userAgentInfo
          }, function(err,mongoRes){
              res.send(mongoRes._id);
              //console.log(mongoRes._id);
          });
          //res.sendStatus(201);

      }
  });
});

app.post('/updateAnswers',function(req,res,next){
    var userId = req.body.id;
    var currentAnswer = req.body.currentAnswer;
    var currentQuestionNumber = req.body.currentQuestionNumber;
    var currentQuestionWords = req.body.currentQuestionWords;
    var mouseTracking = req.body.mouseTracking;
    //check if this question was already answered, if so we need to update instead of addtoset

    dbs.results.find({_id: userId}).count().exec(function (err,findRes) {
        //, 'surveyResults.question': currentQuestionWords
        if (err) {
            console.log(err);
        }
        // id exists
        if (findRes > 0) {
            console.log("id exists");
            // find the submitted question to see if submitted already
            dbs.results.find({_id: userId,surveyResults: {$elemMatch: {questionNumber: currentQuestionNumber}}}).count().exec(function(err, answerExist) {
                console.log("question exists");
                if (err) {
                    console.log(err);
                }
                if (answerExist > 0) {
                    // update the current answer instead of adding to set
                    dbs.results.update({_id: userId, surveyResults: {$elemMatch: {questionNumber: currentQuestionNumber}}},{$inc: { "surveyResults.$.timesSubmitted": 1 }}).exec();

                    dbs.results.update({_id: userId, surveyResults: {$elemMatch: {questionNumber: currentQuestionNumber}}},{$set:{"surveyResults.$.result" : currentAnswer}}).exec();
                    console.log("answer exists");
                    res.send("updated");

                }
                else {
                    console.log("add to set");
                    dbs.results.update({_id: userId}, {
                            $addToSet: {
                                surveyResults: {
                                    questionNumber: currentQuestionNumber,
                                    question: currentQuestionWords,
                                    result: currentAnswer,
                                    mouseTracking: mouseTracking
                                }
                            }
                    },
                        function updateData(err, set) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.send("updated");
                            }


                            //update the previous answers
                        })
                }
            })
        }


    });

    //if not answered already, add to the set
   // dbs.results.update({_id: userId}, {$addToSet:{surveyResults:{questionNumber:currentQuestionNumber,question:currentQuestionWords, result:currentAnswer, mouseTracking:mouseTracking}}});

 /*   dbs.Results.findById(id, function (err, doc) {
        if (err) {
            console.log(err);
        }
        doc.contents[currentAnswer].answers = currentQuestion;
        doc.save(console.log("on question number=" + currentQuestion + "with answer: " + currentAnswer));
    })*/
});


app.listen(3000, function () {
    console.log('App listening on port 3000!')
});


/*

function updateResults(id,currentQuestion,currentValue){

}

dbs.Results.update({id:"kakak@aol.com"}, {$addToSet:{surveyResults:{questionNumber:1,question:"Whats your age"}}})
*/
