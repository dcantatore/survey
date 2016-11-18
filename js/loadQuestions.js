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
        document.querySelector("#ansContainer").innerHTML += '<br><input type="radio" class="fieldRow" name="'+ currentSurveyName +'" value=' + currentAns + '>' + currentAns + '</input>';
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
        document.querySelector('#backButton').className = "button";
        document.querySelector('#backButton').addEventListener("click", enableBackButton);
        document.querySelector('#nextButton').className = "button";
        document.querySelector('#nextButton').addEventListener("click", enableNextButton);
        document.querySelector('#nextButton').innerText = "Next";
    }
    // Get the length of the current survey without manual input
    if (localStorage.questionCount > 5){
        console.log("removed")
        document.querySelector('#nextButton').innerText = "Finish";
        document.querySelector('#nextButton').removeEventListener("click", enableNextButton);
        //something to do when survey is over
    }
}

function enableNextButton (){
    localStorage.questionCount++;
    checkActiveButtons();
    getAnswers();
    getQuestion();

}

function enableBackButton(){
    localStorage.questionCount--;
    checkActiveButtons();
    getAnswers();
    getQuestion();
}