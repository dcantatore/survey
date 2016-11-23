var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost/results');
// connect call back removed
//, function () {
//console.log('mongodb connected')}

/*// define the connection
var db = mongoose.connection;
// on errors log them
db.on('error', console.error.bind(console, 'connection error:'));
//once connected log it
db.once('open', function() {
    console.log('mongodb connected');
});*/


var resultsConn = mongoose.createConnection('mongodb://localhost/results');
var surveysConn = mongoose.createConnection('mongodb://localhost/surveys');




//defining schema
var resultsSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    clickTracking: Array,
    surveyName: String,
    ipInfo: Object,
    surveyResults: [

        {    _id: false,
            questionNumber: String,
            question: String,
            result: String,
            mouseTracking: Array
        },
        {   questionNumber: String,
            question: String,
            result: String,
            mouseTracking: Array
        }
    ]
});


var surveySchema = new Schema({
    name: String,
    count: Number,
    contents: [
        {question: String,
        answers : Array},
        {question: String,
            answers : Array},
        {question: String,
        answers : Array},
        {question: String,
        answers : Array},
        {question: String,
        answers : Array},
        {question: String,
        answers : Array},
        {question: String,
        answers : Array},
        {question: String,
        answers : Array}
    ]
});

//Creating model from schema combined with proper connection, first model field is the collection - gets pluralized
var Results = resultsConn.model('result', resultsSchema);
var Surveys = surveysConn.model('question', surveySchema)

resultsConn.once('open', function() {
    console.log('mongodb connected to results');
});

surveysConn.once('open', function() {
    console.log('mongodb connected to surveys');
});




//exporting connections for app.js

exports.surveys = Surveys;
exports.results = Results;

/*
//Creating model from schema

var Survey = mongoose.model('Survey',surveySchema);


// find works on the model of the schema
// Survey.find({email: "dario2@email.com"}).count().exec(function (err,results){
//     if (err) {
//         return handleError(err);
//     }else{
//         console.log(results);
//     }
// });

//export the survey model for POST requests, change this completely later
*/

