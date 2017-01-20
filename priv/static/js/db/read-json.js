 function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '/js/db/prayers.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

var actual_JSON;

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        actual_JSON = JSON.parse(response);
        // console.log(actual_JSON);
        return actual_JSON;
    });
    // console.log(actual_JSON);
};

init()
// actual_JSON = init();
// console.log(actual_JSON);