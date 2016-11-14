
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
    //add database writing

    var emailStore = document.getElementById("email").value;
    validateEmail(emailStore);

    var fnameStore = document.getElementById("fname").value;
    window.fnameStore = fnameStore;
    localStorage.setItem('fnameStore',fnameStore);

    var lnameStore = document.getElementById("lname").value;
    window.fnameStore = lnameStore;
    localStorage.setItem('lnameStore',lnameStore);

}


function validateEmail(emailStore)
{
    console.log(emailStore);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
    if(emailStore.match(mailformat))
    {
        window.emailStore = emailStore;
        localStorage.setItem('emailStore',emailStore);
    }
    else
    {
        document.querySelector("#email").style.background = "#ffaaaa";
        alert("Please enter a valid email address");


    }
}
