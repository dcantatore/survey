var userInfo;
function getIPinfo() {
    var ipRequest = new XMLHttpRequest();
    ipRequest.open('GET', 'http://ipinfo.io/json', false);
    ipRequest.onload = function () {
        if (ipRequest.status >= 200 && ipRequest.readyState === 4) {
            // Success!
            // var data = JSON.parse(ipRequest.responseText);
            userInfo = JSON.parse(ipRequest.responseText);
          //  console.log(userInfo);
        } else {
            //error
        }
    };
    ipRequest.onerror = function () {
        // There was a connection error of some sort
    };
    ipRequest.send();
}
