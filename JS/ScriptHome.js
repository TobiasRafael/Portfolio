function theNav() {

    var x = document.getElementById("navvv");

    if (x.className === "navv") {
        x.className += " responsive";
    } else {
        x.className = "navv";
    }
}

var one = document.getElementById("first");
var two = document.getElementById("second");
var three = document.getElementById("third");

one.onclick = function() {
    $('#one').modal('show');
}

two.onclick = function() {
    $('#two').modal('show');
}
three.onclick = function() {
    $('#three').modal('show');
}