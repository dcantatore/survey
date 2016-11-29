
document.addEventListener("DOMContentLoaded", function detectSession(){
        if (localStorage.emailStore === undefined || localStorage.emailStore === "" ) {
            // if there is no email from previous session do nothing and wait for it
        } else {
            document.getElementById('questContainer').innerHTML = '<br><br><div class="questContainer">Do you want to continue your previous session with email address: ' + localStorage.emailStore + '<br><br><div class="button divCenter" onclick="continuePreviousSession()">Yes</div><br><div class="button divCenter" onclick="killPreviousSession()">No</div></div>';

        }
    }
);

// if they don't want to continue, clear the previous email
function killPreviousSession(){
    localStorage.clear();
    location.reload();
}


function continuePreviousSession (){
    //get the page last used compare email to db vs local storage

    // run the getAnswers + questions
    getQuestion();
    getAnswers();
    checkActiveButtons();
    pastAnswerCheck();
    setProgress();
    // lookup the email in the DB to verify

    //

}