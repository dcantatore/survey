(function mousey() {
    var mousePos;

    document.onmousemove = handleMouseMove;
    setInterval(getMousePosition, 150); // setInterval repeats every X ms

    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }
    function getMousePosition() {
        var pos = mousePos;
        if (!pos) {
            // We haven't seen any movement yet
        }
        else {
            var containerLocationX = document.getElementById("questContainer").offsetLeft;
            var containerLocationY = document.getElementById("questContainer").offsetTop;
            var containerWidth = document.getElementById("questContainer").offsetWidth;
            var mousePosX = mousePos.x-containerLocationX;
            var mousePosy = mousePos.y-containerLocationY;
            heatMapData.push([mousePosX,mousePosy,containerWidth]);

        }
    }
})();
//temporary storage for data - x,y,containerSize - height is always set
window.heatMapData = [];