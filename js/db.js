var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/results');
// connect call back removed
//, function () {
//console.log('mongodb connected')}

// define the connection
var db = mongoose.connection;
// on errors log them
db.on('error', console.error.bind(console, 'connection error:'));
//once connected log it
db.once('open', function() {
    console.log('mongodb connected');
});



//defining schema
var surveySchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    clickTracking: Array,
    surveyName: String,
    ipInfo: Object,
    surveyResults: [
        {   questionNumber: Number,
            question: String,
            result: String,
            mouseTracking: Array
        },
        {   questionNumber: Number,
            question: String,
            result: String,
            mouseTracking: Array
        },
        {   questionNumber: Number,
            question: String,
            result: String,
            mouseTracking: Array
        },
        {   questionNumber: Number,
            question: String,
            result: String,
            mouseTracking: Array
        },
        {   questionNumber: Number,
            question: String,
            result: String,
            mouseTracking: Array
        },
        {   questionNumber: Number,
            question: String,
            result: String,
            mouseTracking: Array
        },
        {   questionNumber: Number,
            question: String,
            result: String,
            mouseTracking: Array
        },
        {   questionNumber: Number,
            question: String,
            result: String,
            mouseTracking: Array
        },
        {   questionNumber: Number,
            question: String,
            result: String,
            mouseTracking: Array
        }
    ]
});

//Creating model from schema
//
var Survey = mongoose.model('Survey',surveySchema);

// .create saves the data to the database
// Survey.create({
//         email: "dario2@email.com",
//         firstName: "Dario",
//         LastName: "Can",
//         clickTracking: [1,2,3],
//         answers: {
//             a: {
//                 result: "yes", mouseTracking: [1,2,3]
//             },
//             b: {
//                 result: "yes", mouseTracking: [1,2,3]
//             },
//             c: {
//                 result: "yes", mouseTracking: [1,2,3]
//             },
//             d: {
//                 result: "yes", mouseTracking: [1,2,3]
//             },
//             e: {
//                 result: "yes", mouseTracking: [1,2,3]
//             }
//         }
//     }, function (err, saved) {
//     if (err) {
//         return handleError(err);
//     }else{
//         //saved is the object that was created
//         // possibly use the _id to return to browser
//         console.log(saved._id);
//     }
//     // saved!
// });

// find works on the model of the schema
// Survey.find({email: "dario2@email.com"}).count().exec(function (err,results){
//     if (err) {
//         return handleError(err);
//     }else{
//         console.log(results);
//     }
// });

//export the survey model for POST requests, change this completely later
module.exports = Survey;