
document.addEventListener("DOMContentLoaded", function() {
    //check that there is no data before binding event
    if(localStorage.emailStore === undefined || localStorage.emailStore === null) {
        document.getElementById("startButton").addEventListener('click', startSubmit);
    }
    //enable enter to submit from any input field
    var inputBind = document.getElementsByTagName('input');
     for(var i=0; i < inputBind.length; i++){
       inputBind[i].addEventListener('keypress', function (e) {
           var key = e.which || e.keyCode;
           if (key === 13) {
               startSubmit();
           }
       });
     }

});

function startSubmit(){
    getIPinfo();
    var emailStore = document.getElementById("email").value;
    //run validater, if it passes, continue, if not break
    if (validateEmail(emailStore) === false) {
        return;
    }
    if (validateName() === false) {
        return;
    }
    // if everything passes the tests store the variables locally
    var fnameStore = document.getElementById("fname").value;
    var lnameStore = document.getElementById("lname").value;
    window.emailStore = emailStore;
    localStorage.setItem('emailStore',emailStore);
    window.fnameStore = fnameStore;
    localStorage.setItem('fnameStore',fnameStore);
    window.fnameStore = lnameStore;
    localStorage.setItem('lnameStore',lnameStore);


   //create object to send
    var data = {fname: fnameStore, lname: lnameStore, email: emailStore, ipInfo: userInfo};

    var request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/newUser', true);
    request.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
    //needs to be json... to send as json
    request.send(JSON.stringify(data));
    request.onreadystatechange = function userExists(){
        // readystate 4 operation is complete, and the user is already in the DB
        if(request.readyState === 4 && request.responseText === "user exists") {
            alert("Email: " + emailStore + " already exists, please enter a new email")
        }
        if(request.readyState === 4 && request.responseText !== "user exists") {
           // console.log(request.responseText);
            // maybe slice first and last instead of sub
            localStorage.setItem('id', request.responseText.substring(1, 25));
            localStorage.setItem('questionCount', 0);
            console.log(localStorage.questionCount + " after set");
            window.questionCount = 0;
            getQuestion();
            getAnswers();
            checkActiveButtons();
            //document.querySelector('#nextButton').className = "button";
            console.log(localStorage.questionCount + " exit");

        }
    };
}


function validateEmail(emailStore) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
    if(emailStore.match(mailformat))
    {

    }
    else {
        document.querySelector("#email").style.background = "#ffaaaa";
        alert("Please enter a valid email address");
        return false;
    }
};

function validateName() {
    var nameInputs = document.querySelectorAll('input[type="text"]');
    var nameFormat = /^[A-Za-z\s\.]+$/;
    var passFail = 0;
    for (i = 0; i < nameInputs.length; i++){
        if (nameFormat.test(nameInputs[i].value)) {
            nameInputs[i].style.background = "#ffffff"
        }
        else{
            nameInputs[i].style.background = "#ffaaaa";
            alert("Please enter a valid " + nameInputs[i].placeholder + " name");
            passFail++;
        }


    }
    if (passFail > 0){
        return false;
    }
};

function blurValidate(event){
    if (event.target.type === "text") {
        var nameFormat = /^[A-Za-z\s\.]+$/;
        if (nameFormat.test(event.target.value)) {
            event.target.style.background = "#ffffff"
        }
        else{
            event.target.style.background = "#ffaaaa";
        //alert("Please enter a valid " + event.target.placeholder + " name");

        }
    }
    if (event.target.type === "email") {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
        if(event.target.value.match(mailformat))
        {
            event.target.style.background = "#ffffff"
        }
        else {
            event.target.style.background = "#ffaaaa";
            // alert("Please enter a valid email address");
            // return false;
        }
    }
};