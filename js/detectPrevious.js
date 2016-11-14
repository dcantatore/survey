
document.addEventListener("DOMContentLoaded", function detectSession(){
        if (localStorage.emailStore === undefined || localStorage.emailStore === "" ) {
            // if there is no email from previous session do nothing and wait for it
        } else {
            document.getElementById('questContainer').innerHTML = '<br><br><div class="questContainer">Do you want to continue your previous session with email address: ' + localStorage.emailStore + '</div><br><button>Yes</button><button onclick="killPreviousSession()">No</button>';

        }
    }
);

// if they don't want to continue, clear the previous email
function killPreviousSession(){
    localStorage.clear();
    location.reload();
}


