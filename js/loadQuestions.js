var currentSurveyName = [Object.keys(window.survey)[0]].toString();
//var currentSurveyLength = window.survey.[Object.keys(window.survey)[0]].length;
//console.log(currentSurveyLength);

function getQuestion() {
    document.querySelector("#questContainer").innerHTML = "<br><br>" + window.survey.surveyOne[window.questionCount].question;
}

function getAnswers() {
    // clear previous answers
    document.querySelector("#ansContainer").innerHTML = "";
    // get new answers
    var answerArr = window.survey.surveyOne[window.questionCount].answers;
    //output answers
    for(var i = 0 ; i < answerArr.length; i++){
        var currentAns = window.survey.surveyOne[window.questionCount].answers[i];
        document.querySelector("#ansContainer").innerHTML += '<br><input type="radio" class="fieldRow" name="'+ currentSurveyName +'" value=' + currentAns + '>' + currentAns + '</input>';
    }
}

function activateButtons(){
    document.querySelector('#nextButton').className = "button";
    document.querySelector('#nextButton').addEventListener("click", enableNextButton);
}

function checkActiveButtons(){
    if (window.questionCount === 0){
        console.log(window.questionCount);
        document.querySelector('#backButton').className = "inactiveButton";
        document.querySelector('#backButton').removeEventListener("click", enableBackButton);
        return;
    }
    if (window.questionCount > 0){
        document.querySelector('#backButton').className = "button";
        document.querySelector('#backButton').addEventListener("click", enableBackButton);
    }
    // Get the length of the current survey without manual input
    if (window.questionCount > 5){
        console.log("removed")
        document.querySelector('#nextButton').innerText = "Finish";
        //something to do when survey is over
    }
}

function enableNextButton (){
    window.questionCount++;
    checkActiveButtons();
    getAnswers();
    getQuestion();

}

function enableBackButton(){
    window.questionCount--;
    checkActiveButtons();
    getAnswers();
    getQuestion();
}