//using native driver instead of mongoose as test
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost/results';


MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected");
    getResults(db);
});




function getResults (db){
    var returnRes = new Promise(function(resolve, reject) {
        var outputResults = [];
        var lengthFinal = 0;
        //creates array of questions
        //add a $match based on user input here to make sure we are showing the results for the survey they choose
        db.collection('results').aggregate([{$unwind: "$surveyResults"}, {$group: {_id: "$surveyResults.question"}}], function (err, results) {
            assert.equal(err, null);
            var lengthBefore = results.length;

            results.map(function (obj) {
                // use for in loop to get the quesion text out of each object
                for (var ids in obj) {
                    //simplify question to variable for multi use
                    var currentQuestion = obj[ids];
                    db.collection('results').aggregate([{$unwind: "$surveyResults"}, {$match: {"surveyResults.question": currentQuestion}}, {
                        $group: {
                            _id: "$surveyResults.result",
                            count: {$sum: 1}
                        }
                    }], function (err, result) {
                        assert.equal(err, null);

                        console.log(currentQuestion);
                        console.log(result);
                        lengthFinal++;
                        console.log(lengthFinal + "   " + lengthBefore);
                        if (lengthBefore === lengthFinal){
                            console.log("resolve");
                            resolve();
                        }
                    });
                    // console.log(currentAnswers);
                }
            });


        });

    });
    returnRes.then(function(){
        db.close();
    })

};

