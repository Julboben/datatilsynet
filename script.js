//Anette, Maya og Julians Seje Quiz

//Dots
const stepBtns = document.getElementById("step-btn");

const dot = document.getElementsByClassName("step-dot");
const slide = document.getElementsByClassName("form-row");

//Buttons
const startBtn = document.getElementById("btn-start");
const backBtn = document.getElementById("btn-back");
const nextBtn = document.getElementById("btn-next");

function startQuiz() {
    slide[0].classList.remove("form-row-active");
    slide[1].classList.add("form-row-active");
    dot[0].classList.add("dot-active");
    startBtn.style.display = "none";
    stepBtns.style.display = "flex";
    //Starts Countdown
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

}

// THIS NEEDS TO WORK!
/*
const true = 

const qOne = document.querySelector('input[name="datatilsynet"]:checked').value;
if (qOne = "true") {
    document.getElementById("q1").innerText = "Korrekt svaret!";
} if (qOne = "false") {
    document.getElementById("q1").style.color = "red";
    document.getElementById("q1").innerText = "Forkert svaret!";
} */


//NEW TRY! ONLY WORKS ON THE FIRST RADIO BUTTON - ALERTS
/* const radioData = document.getElementsByName("datatilsynet");

for (const i = 0, length = radioData.length; i < length; i++) {
    if (radioData[i].checked) {
        alert(radioData[i].value);
        break;
    }
} */

function dotChangeNext() {
    // Prints value from input when pressed
    const aOne = document.querySelector('input[name="datatilsynet"]:checked').value;
    document.getElementById("a1").innerText = aOne;
    alert(aOne);


    if (slide[8].classList.contains("form-row-active")) {
        slide[8].classList.toggle("form-row-active");
        slide[9].classList.toggle("form-row-active");
        stepBtns.style.display = "none";
    }
    else if (dot[6].classList.contains("dot-active")) {
        dot[7].classList.toggle("dot-active");
        slide[7].classList.toggle("form-row-active");
        slide[8].classList.toggle("form-row-active");
        nextBtn.innerText = "Afslut quizzen";
    }
    else if (dot[5].classList.contains("dot-active")) {
        dot[6].classList.toggle("dot-active");
        slide[6].classList.toggle("form-row-active");
        slide[7].classList.toggle("form-row-active");
    }
    else if (dot[4].classList.contains("dot-active")) {
        dot[5].classList.toggle("dot-active");
        slide[5].classList.toggle("form-row-active");
        slide[6].classList.toggle("form-row-active");
    }
    else if (dot[3].classList.contains("dot-active")) {
        dot[4].classList.toggle("dot-active");
        slide[4].classList.toggle("form-row-active");
        slide[5].classList.toggle("form-row-active");
    }
    else if (dot[2].classList.contains("dot-active")) {
        dot[3].classList.toggle("dot-active");
        slide[3].classList.toggle("form-row-active");
        slide[4].classList.toggle("form-row-active");
    }
    else if (dot[1].classList.contains("dot-active")) {
        dot[2].classList.toggle("dot-active");
        slide[2].classList.toggle("form-row-active");
        slide[3].classList.toggle("form-row-active");

    }
    else if (dot[0].classList.contains("dot-active")) {
        backBtn.classList.toggle("btn-inactive");
        dot[1].classList.toggle("dot-active");
        slide[1].classList.toggle("form-row-active");
        slide[2].classList.toggle("form-row-active");
    }
}

function dotChangeBack() {
    // Type ! in front of element to do the opposite. Does NOT contain
    if (dotTwo.classList.contains("dot-active")) {
        backBtn.classList.toggle("btn-inactive");
        dotTwo.classList.toggle("dot-active");
        slideOne.classList.toggle("form-row-active");
    }
    if (!dotThree.classList.contains("dot-active")) {
        dotTwo.classList.remove("dot-active");
        slideOne.classList.remove("form-row-active");
    }
    if (!dotFour.classList.contains("dot-active")) {
        dotThree.classList.remove("dot-active");
    }
    if (!dotFive.classList.contains("dot-active")) {
        dotFour.classList.remove("dot-active");
    }
    if (!dotSix.classList.contains("dot-active")) {
        dotFive.classList.remove("dot-active");
    }
    if (dotSix.classList.contains("dot-active")) {
        dotSix.classList.remove("dot-active");
    }
}

//Info boks popup
function infoPopup() {
    const popup = document.getElementById("info-popuptext");
    popup.classList.toggle("info-show");
}

//Cookie popup

// Get the modal
const cookieModal = document.getElementById("cookie-popup");

function closeCookiePopup() {
    cookieModal.style.display = "none";
}


//Report popup

// Get the modal
const reportModal = document.getElementById("report-popup");
const reportOpenBtn = document.getElementById("report-btn");
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
reportOpenBtn.onclick = function () {
    reportModal.style.display = "block";
}

span.onclick = function () {
    reportModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == reportModal) {
        reportModal.style.display = "none";
    }
}

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}