var heatmapInstance = h337.create({
    // only container is required, the rest will be defaults
    container: document.querySelector('#container')
});

// now generate some random data
var points = [];
var max = 0;
var width = document.getElementById("questContainer").offsetWidth;;
var height = 700;
var len = 300;

while (len--) {
    var val = Math.floor(Math.random()*100);
    // now also with custom radius
    var radius = Math.floor(Math.random()*70);

    max = Math.max(max, val);
    var point = {
        x: Math.floor(Math.random()*width),
        y: Math.floor(Math.random()*height),
        value: val,
        // radius configuration on point basis
        radius: radius
    };
    points.push(point);
}
// heatmap data format
var data = {
    max: max,
    data: points
};
// if you have a set of datapoints always use setData instead of addData
// for data initialization
heatmapInstance.setData(data);

