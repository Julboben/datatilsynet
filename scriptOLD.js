const dotOne = document.getElementById("dot1");
const dotTwo = document.getElementById("dot2");
const dotThree = document.getElementById("dot3");
const dotFour = document.getElementById("dot4");
dotOne.style.backgroundColor = "black";
dotTwo.style.backgroundColor = "grey";
dotThree.style.backgroundColor = "grey";
dotFour.style.backgroundColor = "grey";

function dotChangeNext() {

    if (dotThree.style.backgroundColor == "black") {
        dotFour.style.backgroundColor = "black"
    }
    if (dotTwo.style.backgroundColor == "black") {
        dotThree.style.backgroundColor = "black"
    }
    if (dotOne.style.backgroundColor == "black") {
        dotTwo.style.backgroundColor = "black"
    }
}

function dotChangeBack() {
    if (dotThree.style.backgroundColor == "grey") {
        dotTwo.style.backgroundColor = "grey"
    }
    if (dotFour.style.backgroundColor == "grey") {
        dotThree.style.backgroundColor = "grey"
    }
    if (dotFour.style.backgroundColor == "black") {
        dotFour.style.backgroundColor = "grey"
    }


}


filterSelection("all")
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

// Show filtered elements
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("filter-active");
        current[0].className = current[0].className.replace(" filter-active", "");
        this.className += " filter-active";
    });
}