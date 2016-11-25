var currentSurveyName = [Object.keys(window.survey)[0]].toString();
//var currentSurveyLength = window.survey.[Object.keys(window.survey)[0]].length;
//console.log(currentSurveyLength);

function getQuestion() {
    document.querySelector("#questContainer").innerHTML = "<br><br>" + window.survey.surveyOne[localStorage.questionCount].question;
}

function getAnswers() {
    // clear previous answers
    document.querySelector("#ansContainer").innerHTML = "";
    // get new answers
    var answerArr = window.survey.surveyOne[localStorage.questionCount].answers;
    //output answers
    for(var i = 0 ; i < answerArr.length; i++){
        var currentAns = window.survey.surveyOne[localStorage.questionCount].answers[i];
        //console.log(currentAns);
        document.querySelector("#ansContainer").innerHTML += '<br><input type="radio" class="fieldRow" name="'+ currentSurveyName +'" value="' + currentAns + '">' + currentAns + '</input>';
    }
}
/*

function activateButtons(){
    document.querySelector('#nextButton').className = "button";
    document.querySelector('#nextButton').addEventListener("click", enableNextButton);
}
*/

function checkActiveButtons(){
    console.log(localStorage.questionCount + " checkactive start");
    if (localStorage.questionCount == 0){
        console.log(localStorage.questionCount + " local is 0 check active");
        document.querySelector('#backButton').className = "inactiveButton";
        document.querySelector('#backButton').removeEventListener("click", enableBackButton);
        document.querySelector('#nextButton').className = "button";
        document.querySelector('#nextButton').addEventListener("click", enableNextButton);
    }
    if (localStorage.questionCount > 0){
        // add conditionals to ignore these actions if they already exist
        document.querySelector('#backButton').className = "button";
        document.querySelector('#backButton').addEventListener("click", enableBackButton);
        document.querySelector('#nextButton').className = "button";
        document.querySelector('#nextButton').addEventListener("click", enableNextButton);
        document.querySelector('#nextButton').innerText = "Next";
    }
    // Get the length of the current survey without manual input
    // -1 is to account for survey array 0 start
    if (localStorage.questionCount >= window.survey.count - 1){
        document.querySelector('#nextButton').innerText = "Finish";
        document.querySelector('#nextButton').removeEventListener("click", enableNextButton);
        console.log("finished event triggered");
        // create finishSurveyAction function to wrap up events, include final answer write - addAnswer
        //document.querySelector('#nextButton').addEventListener("click", finishSurveyAction);
        //need to remove finish action if user pressed back possibly in conditional above
    }

}

function enableNextButton (){
    addAnswer();
    localStorage.questionCount++;
    checkActiveButtons();
    getAnswers();
    getQuestion();
    pastAnswerCheck();
}

function enableBackButton(){
    localStorage.questionCount--;
    checkActiveButtons();
    getAnswers();
    getQuestion();
    pastAnswerCheck();
}

function addAnswer() {
    var answer = document.querySelector('input[type=radio]:checked').value;
    var questionsWords = document.querySelector('#questContainer').innerText.replace(/(\r\n|\n|\r)/gm,"");
    var questionNumber = localStorage.questionCount;
    var id = localStorage.id;
    localStorage.setItem(questionNumber, answer);

/*  what server is expexting
    //need to get id back from server after write
    var userId = req.body.id;
    var currentAnswer = req.body.currentAnswer;
    var currentQuestionNumber = req.body.currentQuestionNumber;
    var currentQuestionWords = req.body.currentQuestionWords;
    //need to find format still
    var mouseTracking = req.body.mouseTracking;

    */

    var data = {id: id, currentAnswer: answer, currentQuestionNumber: questionNumber, currentQuestionWords: questionsWords};
    var sendAnswer = new XMLHttpRequest();
    sendAnswer.open('POST', 'http://localhost:3000/updateAnswers', true);
    sendAnswer.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
//needs to be json... to send as json
    sendAnswer.send(JSON.stringify(data));
    sendAnswer.onreadystatechange = function verifyWritten() {
        // readystate 4 operation is complete, and the user is already in the DB
        if (sendAnswer.readyState === 4 && sendAnswer.responseText === "written") {
            console.log(data + " committed");

        }
    };
}

function pastAnswerCheck () {
    if (localStorage[localStorage.questionCount] != undefined ){
        document.querySelector('input[value="' + localStorage[localStorage.questionCount] + '"]').checked = true;
    }
}